<?php

namespace App\Http;

final class Request
{
    private ?string $bearer = null;
    
    private string $method;
    private string $uri;

    private string $userAgent;
    private string $ip;

    private array $body;
    private array $headers;
    private array $params;

    private bool $paramsWasDefined = false;

    public function __construct()
    {
        /**
         * Inicializa a variável $params.
         * Ela deverá ser preenchida futuramente pelo router.
         */
        $this->params = [];

        /**
         * Inicializa $headers com os headers recebidos na requisição.
         */
        $this->headers = getallheaders();
        
        /**
         * Inicializa $body com o JSON recebido no payload da requisição.
         * Se o conteúdo não for um JSON válido, então envia uma resposta 400.
         */
        $body = json_decode(file_get_contents('php://input'), true);
        if (json_last_error() === JSON_ERROR_NONE) {
            $this->body = $body;
        } else {
            new Response(Status::BAD_REQUEST, [
                "O JSON enviado no corpo da requisição é inválido."
            ]);
        }

        /**
         * Inicializa $method com o método HTTP acessado.
         */
        $this->method = $_SERVER['REQUEST_METHOD'];

        /**
         * Inicializa $uri com a URI acessada.
         */
        $this->uri = self::getUri();

        /**
         * Inicializa $host com o domínio recebido na requisição.
         */
        $this->userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';

        /**
         * Inicializa $ip com o IP recebido na requisição.
         */
        $this->ip = $_SERVER['REMOTE_ADDR'] ?? '';

        /**
         * Inicializa $bearer com o valor do Bearer Token (Header Authorization)
         */
        if (isset($this->headers['Authorization']) && str_contains($this->headers['Authorization'], 'Bearer '))
        {
            $authorizationHeaderPieces = explode(' ', $this->headers['Authorization'], 2);

            if (count($authorizationHeaderPieces) === 2)
            {
                $this->bearer = $authorizationHeaderPieces[1];
            }
        }
    }

    public function __get($property)
    {
        return $this->$property;
    }

    public function __set($property, $value)
    {
        if ($property === 'params' && $this->paramsWasDefined === false)
        {
            $this->params = $value;
            $this->paramsWasDefined = true;
            return;
        }
        throw new \Exception("A propriedade $property não existe ou não pode ser alterada.");
    }

    private static function getUri()
    {
        $uri = explode('/', trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/'));
        array_shift($uri);
        $uri = '/' . implode('/', $uri);
        return $uri;
    }
}
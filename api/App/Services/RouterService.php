<?php

namespace App\Services;

use App\Http\Response;
use App\Http\Status;
use App\Http\Request;

final class RouterService {
    private static string $routesFilePath;
    private static array $routes;

    private static Request $request;

    public static function initialize(string $routesJsonFile)
    {
        self::$routesFilePath = $routesJsonFile;
        self::$routes = json_decode(file_get_contents($routesJsonFile), true);

        self::$request = new Request();

        self::handleRoute();
    }

    private static function handleRoute()
    {
        foreach (self::$routes[self::$request->method] as $route => $options)
        {
            preg_match_all('/\{([^\/]+)\}/', $route, $paramNames);
            $paramNames = $paramNames[1];

            $pattern = "@^" . preg_replace('/\{([^\/]+)\}/', '([^/]+)', $route) . "$@";

            if (preg_match($pattern, self::$request->uri, $matches)) {
                array_shift($matches);

                if (!isset($options) || gettype($options) != 'array') {
                    throw new \Exception("A rota ".self::$request->method.":".self::$request->uri." não contém uma lista de opções válidas em sua definição em '".self::$routesFilePath."'.");
                }

                if (!isset($options['handler']) || count(explode('@', $options['handler'])) != 2)
                {
                    throw new \Exception("A rota ".self::$request->method.":".self::$request->uri." não contém um campo 'handler' válido.");
                }

                if (!isset($options['access']) || ($options['access'] != 'public' && $options['access'] != 'private'))
                {
                    throw new \Exception("A rota ".self::$request->method.":".self::$request->uri." não contém um campo 'access' válido.");
                }

                [$controller, $function] = explode('@', $options['handler']);

                $controller = "App\\Controllers\\{$controller}";

                if (!method_exists($controller, $function)) {
                    throw new \Exception("O método ou controlador não foi encontrado.");
                }

                $params = array_combine(
                    $paramNames,
                    array_map(
                        fn($value) => is_numeric($value) ? (strpos($value, '.') !== false ? (float) $value : (int) $value) : $value, $matches
                    )   
                );

                self::$request->params = $params;
                
                $response = $controller::$function(self::$request);

                if (!$response || get_class($response) != 'App\Http\Response') {
                    throw new \Exception("O retorno dos métodos dos controladores devem ser um objeto do tipo 'Response'");
                }

                return;
            }
        }
        new Response(Status::NOT_FOUND);
    }
}
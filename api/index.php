<?php
/**
 * index.php
 * 
 * Inicializa o autoloader e os serviços.
 * 
 * @author: Luan Gabriel
 */


/**
 * Inicializa o autoloader
 */
require_once __DIR__ . '/vendor/autoload.php';  

/**
 * Importa os serviços
 */
use App\Services;

/**
 * Inicializa o serviço de configurações da aplicação.
 * 
 * Valida o arquivo options.json e coloca seu conteúdo em
 * uma constante 'OPTIONS' que pode ser utilizada por toda
 * a aplicação.
 */
Services\OptionService::initialize('./options.json');

/**
 * Inicializa o serviço de captura de erros
 * 
 * Erros e exceções só será visiveis em ambiente de desenvolvimento.
 */
Services\ErrorService::initialize();

/**
 * Inicializa o serviço de conexão ao banco de dados.
 */
Services\DatabaseService::initialize();

/**
 * Inicia o router utilizando as rotas definidas em routes.json
 * 
 * Verifica se a rota acessada existe no arquivo routes.json e
 * caso exista, chama a função no controlador correspondente.
 */
Services\RouterService::initialize('./routes.json');
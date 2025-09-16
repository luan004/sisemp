<?php declare(strict_types=1);

namespace App\Helpers;

use App\Http\Status;
use App\Http\Response;

use App\Helpers\BetterFunctions;
use App\Helpers\ValidationRules;

final class Validate extends ValidationRules
{
    private const ALLOWED_TYPES = ['string', 'integer', 'float', 'array'];

    protected static string $placeholderFieldName;

    public static function __callStatic($method, $args)
    {
        if (in_array($method, ['body', 'headers', 'params', 'array']))
        {
            switch (count($args)) {
                case 2:
                    return self::initializeArrayValidation(self::getNaturalFieldName($method), $args[0], $args[1]);
                case 3:
                    return self::initializeArrayValidation(self::getNaturalFieldName($method), $args[0], $args[1], $args[2]);
                default:
                    throw new \Exception("A função '$method' espera receber dois ou três parâmetros.");
            }
        }
    }

    private static function initializeArrayValidation(string $placeholderFieldName, array $data, array $template, Status|bool $failStatus = Status::BAD_REQUEST): array
    {
        self::$placeholderFieldName = $placeholderFieldName;

        $errors = self::validateArray($data, $template);

        if ($failStatus !== false && $errors != []) {
            new Response($failStatus, $errors);
        }

        return $errors;
    }

    public static function validateArray(array $data, array $template): array  
    {
        $errors = [];
        $placeholderFieldName = self::$placeholderFieldName;

        foreach ($template as $field => $ruleSet)
        {
            if (is_array($template[$field])){

                if (is_array($data[$field] ?? []))
                {
                    $arrayErrors = self::validateArray($data[$field] ?? [], $template[$field]);
                } else {
                    $errors[$field][] = "O $placeholderFieldName '$field' deve ser um array.";
                    continue;
                }

                if ($arrayErrors !== [])
                {
                    $errors[$field] = $arrayErrors;
                }
                
                continue;
            }

            [$isRequired, $isNullable, $types, $simpleRules] = self::getTreatedRules($ruleSet);

            if (!isset($data[$field])) {
                if ($isRequired) {
                    $errors[$field][] = "O $placeholderFieldName '$field' é obrigatório.";
                }
                continue;
            }

            if ($types !== [] && !in_array(gettype($data[$field]), $types))
            {
                $errors[$field][] = "O $placeholderFieldName '$field' deve ser de tipo '" .  BetterFunctions::complexImplode("', '", "' ou '", $types) . "'";
                break;
            }

            foreach ($simpleRules as $simpleRule)
            {
                [$validation, $message] = self::validSimpleRule($field, $data[$field], $simpleRule);
                if (!$validation)
                {
                    $errors[$field][] = $message;
                }
            }
        }

        return $errors;
    }

    private static function getTreatedRules(string $ruleSet): array
    {
        $rules = array_diff(explode('|', strtolower($ruleSet)), ['']);

        $isRequired = false;
        $isNullable = false;
        $types = [];
        $simpleRules = [];

        foreach ($rules as $rule)
        {
            /**
             * Verifica se é obrigatório
             */
            if ($rule === 'required') $isRequired = true;
            
            /**
             * Verifica se é nulável.
             */
            else if ($rule === 'nullable') $isNullable = true;

            /**
             * Verifica se é uma regra de tipagem;
             */
            else if (in_array($rule, self::ALLOWED_TYPES)) $types[] = $rule;

            /**
             * Se não for nenhum dos anteriores, entende como uma regra comum.
             */
            else $simpleRules[] = $rule;
        }

        return [$isRequired, $isNullable, $types, $simpleRules];
    }

    private static function validSimpleRule(string $field, $value, string $rule): array
    {
        if (str_contains($rule, ':')) {
            [$ruleName, $ruleValue] = explode(':', $rule, 2); 
        } else {
            [$ruleName, $ruleValue] = [$rule, null];
        }

        $method = $ruleName . '_rule';

        if (method_exists(self::class, $method))
        {
            return self::$method($field, $value, $ruleName, $ruleValue);
        }
        
        throw new \Exception("A regra de validação '$ruleName' não foi encontrada.");
    }

    private static function getNaturalFieldName($field): string
    {
        return match ($field) {
            'headers' => 'cabeçalho',
            'params' => 'parâmetro',
            default => 'campo'
        };
    }
}
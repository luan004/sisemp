<?php declare(strict_types=1);

namespace App\Helpers;

abstract class ValidationRules
{
    protected static function min_rule($field, $value, $ruleName, $ruleValue): array
    {
        $fieldType = static::$placeholderFieldName;

        if (in_array(gettype($value), ['integer', 'double'])) {
            $length = $value;
            $message = "O $fieldType '$field' deve ser no mínimo '$ruleValue'.";
        } else {
            $length = strlen(strval($value));
            $message = "O $fieldType '$field' deve ter no mínimo '$ruleValue' caracteres.";
        }

        if ($length < $ruleValue) {
            return [false, $message];
        }

        return [true, ""];
    }

    protected static function max_rule($field, $value, $ruleName, $ruleValue): array
    {
        $fieldType = static::$placeholderFieldName;

        if (in_array(gettype($value), ['integer', 'double'])) {
            $length = $value;
            $message = "O $fieldType '$field' deve ser no máximo '$ruleValue'.";
        } else {
            $length = strlen(strval($value));
            $message = "O $fieldType '$field' deve ter no máximo '$ruleValue' caracteres.";
        }

        if ($length > $ruleValue) {
            return [false, $message];
        }

        return [true, ""];
    }

    protected static function email_rule($field, $value, $ruleName): array
    {
        $fieldType = static::$placeholderFieldName;
        return [filter_var($value, FILTER_VALIDATE_EMAIL), "O " . static::$placeholderFieldName . " '$field' não é um e-mail válido."];
    }
}
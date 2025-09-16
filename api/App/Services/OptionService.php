<?php

namespace App\Services;

final class OptionService
{
    public static function initialize(string $optionsJsonFile)
    {
        define('OPTIONS', json_decode(file_get_contents($optionsJsonFile), true));
    }
}
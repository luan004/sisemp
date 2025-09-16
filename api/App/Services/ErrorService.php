<?php

namespace App\Services;

use App\Http\Response;
use App\Http\Status;

final class ErrorService
{
    private static array $errors = [];

    public static function initialize()
    {
        set_exception_handler([self::class, 'handleException']);
        set_error_handler([self::class, 'handleError']);
        register_shutdown_function([self::class, 'handleShutdown']);
    }

    public static function handleException(\Throwable $ex): void
    {
       $GLOBALS['errors'][] = self::constructErrorMessages('Exception', $ex->getMessage(), $ex->getFile(), $ex->getLine());
    }

    public static function handleError($errno, $message, $file, $line): void
    {
        $GLOBALS['errors'][] = self::constructErrorMessages('Error', $message, $file, $line);
    }

    public static function handleShutdown()
    {
        if (!empty($GLOBALS['errors'])) {
            new Response(Status::INTERNAL_SERVER_ERROR, self::$errors);
        }
    }

    private static function constructErrorMessages($title, $message, $file, $line): array
    {
        $file = str_replace('\\', '/', substr($file, strpos($file, "\\sloo")));
        
        return [
            "message" => "$title: $message",
            "file" => "$file:$line"
        ];
    }
}
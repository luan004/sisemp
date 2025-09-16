<?php

namespace App\Http;

use App\Http\Status;

final class Response
{
    private Status $status;
    private array $data = [];
    private array $errors = [];

    public function __construct(Status $status, array $data = []) {
        $this->status = $status;

        if ($status->value < 300) {
            $this->data = $data;
        } else {
            $this->errors = $data;
        }

        $this->handleResponse();
    }

    private function handleResponse(): void
    {
        if (isset($GLOBALS['errors']) && !empty($GLOBALS['errors'])) {
            $code = 500;
            $message = 'INTERNAL_SERVER_ERROR';
            $data = [];

            if (OPTIONS['environment'] === 'dev') {
                $errors = ["@dev" => $GLOBALS['errors']];
                $GLOBALS['errors'] = [];
            } else {
                $errors = [];
            }
        } else {
            $code = $this->status->value;
            $message = $this->status->name;
            $data = $this->data;
            $errors = $this->errors;
        }

        if (OPTIONS['environment'] == 'prod') {
            header_remove("X-Powered-By");
            header_remove("Server");
        }

        http_response_code($code);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            "code" => $code,
            "message" => $message,
            "data" => $data,
            "errors" => $errors
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
}
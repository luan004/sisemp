<?php

namespace App\Controllers;

use App\Http\Response;
use App\Http\Status;
use App\Http\Request;
use App\Helpers\Validate;

use App\Models\User;

class UserController {
    public static function createUser(Request $request): Response
    {
/*         Validate::headers($request->body, [
            "name" => "required|min:10|max:15",
            "user" => [
                "name" => "required|min:5"
            ],
            "mail" => "required|min:5|email"
        ]); */

        return new Response(Status::OK, [
            "users" => "success",
            "teste" => $request->body
        ]);
    }
}
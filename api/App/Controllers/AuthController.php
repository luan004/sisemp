<?php declare(strict_types=1);

namespace App\Controllers;

use Carbon\Carbon;

use App\Http\Request;
use App\Http\Response;
use App\Http\Status;

use App\Helpers\Validate;
use App\Helpers\Encryption;
use App\Helpers\Jwt;

use App\Models\User;
use App\Models\Session;

final class AuthController
{
    public static function login(Request $request): Response
    {
        Validate::body($request->body, [
            "username" => "required|string|min:3",
            "password" => "required|string|min:3"
        ], Status::UNAUTHORIZED);

        $user = User::where('username', $request->body['username'])->first();

        if (!$user)
        {
            return new Response(Status::UNAUTHORIZED);
        }

        if (!Encryption::verifyPasswordHash($request->body['password'], $user->password))
        {
            return new Response(Status::UNAUTHORIZED);
        }

        $refresh = Encryption::generateRefreshToken();

        Session::create([
            "user_id" => $user->id,
            "device" => $request->userAgent,
            "refresh_token" => $refresh,
            "expires_at" => Carbon::now()->addSeconds(OPTIONS['REFRESH_TOKEN']['EXPIRES'])
        ]);

        return new Response(Status::OK, [
            "tokens" => [
                "refresh" => $refresh,
                "access" => Jwt::bearer($user)
            ]
        ]);
    }

    public static function refresh(Request $request): Response
    {
        Validate::body($request->body, [
            "refresh_token" => "required|min:64|max:64|string"
        ]);

        $session = Session::where('refresh_token', $request->body['refresh_token'])->where('expires_at', '>', date('Y-m-d H:i:s'))->first();

        if (!$session || !$session->user) {
            return new Response(Status::UNAUTHORIZED);
        }

        $access = Jwt::bearer($session->user);

        return new Response(Status::OK, [
            "access" => $access
        ]);
    }
}
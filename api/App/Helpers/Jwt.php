<?php declare(strict_types=1);

namespace App\Helpers;

use App\Models\User;

final class Jwt
{
    public static function gen(int $expires, array $payload): string
    {
        $payload['exp'] = time() + $expires;

        $header = self::base64_url_encode(json_encode([ "alg" => "HS512", "typ" => "JWT" ]));
        $payload = self::base64_url_encode(json_encode($payload));
        $signature = self::base64_url_encode(hash_hmac('sha512', "$header.$payload", OPTIONS['JWT']['KEY'], true));

        return "$header.$payload.$signature";
    }

    public static function bearer(User $user)
    {
        return self::gen(OPTIONS['JWT']['EXPIRES'], [
            "name" => $user->name,
            "username" => $user->username,
        ]);
    }

    private static function base64_url_encode($text):String{
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($text));
    }
    
}
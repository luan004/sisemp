<?php declare(strict_types=1);

namespace App\Helpers;

final class Encryption
{
    public static function generateRefreshToken(): string
    {
        return hash('sha256', bin2hex(random_bytes(64)));
    }

    public static function generatePasswordHash(string $password): string
    {
        return password_hash($password, PASSWORD_DEFAULT);
    }

    public static function verifyPasswordHash(string $pass1, string $pass2): bool
    {
        return password_verify($pass1, $pass2);
    }
}
<?php declare(strict_types=1);

namespace App\Helpers;

/**
 * Utilizada para gerar IDs não sequenciais de 16 caracteres alfanuméricos
 */
final class NanoId
{
    public static function random(): string
    {
        $id = '';
        $bytes = random_bytes(OPTIONS['NANOID']['SIZE']);

        for ($i = 0; $i < OPTIONS['NANOID']['SIZE']; $i++)
        {
            $index = ord($bytes[$i]) % OPTIONS['NANOID']['ALPHABET_LENGHT'];
            $id .= OPTIONS['NANOID']['ALPHABET'][$index];
        }
        
        return $id;
    }
}
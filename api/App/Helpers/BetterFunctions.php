<?php declare(strict_types=1);

namespace App\Helpers;

final class BetterFunctions
{
    public static function complexImplode(string $separator, string $lastSeparator, array $items): string
    {
        $lastItem = array_pop($items);
        
        if ($items)
        {
            return implode($separator, $items) . $lastSeparator . $lastItem;
        }
        
        return $lastItem;
    }
}
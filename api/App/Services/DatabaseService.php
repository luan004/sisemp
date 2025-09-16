<?php

namespace App\Services;

use Illuminate\Database\Capsule\Manager as Capsule;

class DatabaseService
{
    public static function initialize()
    {
        $capsule = new Capsule();

        $capsule->addConnection([
            'driver' => OPTIONS['database']['db_driver'],
            'host' => OPTIONS['database']['db_host'],
            'database' => OPTIONS['database']['db_name'],
            'username' => OPTIONS['database']['db_user'],
            'password' => OPTIONS['database']['db_pass'],
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
        ]);

        $capsule->setAsGlobal();
        $capsule->bootEloquent();
    }
}
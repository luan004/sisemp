<?php

namespace App\Models;

use App\Models\BaseModel;

class User extends BaseModel
{
    protected $primaryKey = 'user_id';

    protected $fillable = ['nanoid', 'name', 'username', 'password'];

    protected $dates = ['created_at', 'updated_at'];
}
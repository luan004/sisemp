<?php declare(strict_types=1);

namespace App\Models;

use App\Models\BaseModel;

use App\Models\User;

class Session extends BaseModel
{
    protected $fillable = ['nanoid', 'user_id', 'device', 'refresh_token', 'expires_at'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
<?php declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Helpers\NanoId;

abstract class BaseModel extends Model
{
    protected function create(array $attributes = []) 
    {
        if (empty($attributes['nanoid'])) {
            $attributes['nanoid'] = NanoId::random();
        }
    
        return parent::create($attributes);
    }
}
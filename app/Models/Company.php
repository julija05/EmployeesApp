<?php

namespace App\Models;

use App\Traits\Relations\BelongsToManyEmployees;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Relations\HasShifts;

class Company extends Model
{
    use HasFactory;
    use HasShifts;
    use BelongsToManyEmployees;

    protected $fillable = [
        'name', 
    ];
}

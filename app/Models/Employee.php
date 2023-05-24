<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Relations\HasShifts;
use App\Traits\Relations\BelongsToManyCompanies;

class Employee extends Model
{
    use HasFactory;
    use HasShifts;
    use BelongsToManyCompanies;

    protected $fillable = [
        'worker', 
        'company', 
        'taxable'
    ];
}

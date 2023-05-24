<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Relations\BelongsToEmployee;
use App\Traits\Relations\BelongsToCompany;

class Shift extends Model
{
    use HasFactory;
    use BelongsToEmployee;
    use BelongsToCompany;

    protected $fillable = [
        'date', 
        'hours', 
        'rate_per_hour', 
        'status', 
        'shift_type', 
        'paid_at',
        'employee_id',
        'company_id'
    ];

    protected $dates = [
        'date',
        'paid_at'
    ];
}

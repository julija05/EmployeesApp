<?php

namespace App\Traits\Relations;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * This trait contains everything connected to belongsTo(User::class) relationship
 */
trait BelongsToManyEmployees
{
    /**
     * @return BelongsToMany
     */
    public function employees(): BelongsToMany
    {
        return $this->belongsToMany(Employee::class,'employees_company');
    }
}
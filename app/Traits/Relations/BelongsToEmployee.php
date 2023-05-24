<?php

namespace App\Traits\Relations;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * This trait contains everything connected to belongsTo(User::class) relationship
 */
trait BelongsToEmployee
{
    /**
     * @return BelongsTo
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}
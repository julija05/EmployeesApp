<?php

namespace App\Traits\Relations;

use App\Models\Company;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * This trait contains everything connected to belongsTo(User::class) relationship
 */
trait BelongsToCompany
{
    /**
     * @return BelongsTo
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
<?php

namespace App\Traits\Relations;

use App\Models\Company;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * This trait contains everything connected to belongsTo(User::class) relationship
 */
trait BelongsToManyCompanies
{
    /**
     * @return BelongsToMany
     */
    public function companies(): BelongsToMany
    {
        return $this->belongsToMany(Company::class,'employees_company');
    }
}
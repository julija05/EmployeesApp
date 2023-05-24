<?php

namespace App\Traits\Relations;

use App\Models\Shift;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait HasShifts
{
    /**
     * @return HasMany
     */
    public function shifts(): HasMany
    {
        return $this->hasMany(Shift::class);
    }
}
<?php

namespace App\Listeners;

use App\Events\CachedDataChanged;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Cache;

class ClearCachedData
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(CachedDataChanged $event): void
    {
        Cache::forget('controllerData.shifts');
        Cache::forget('controllerData.employees');
        Cache::forget('controllerData.companies');
    }
}

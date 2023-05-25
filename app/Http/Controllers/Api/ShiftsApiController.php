<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shift;
use App\Events\CachedDataChanged;

class ShiftsApiController extends Controller
{
    public function shiftsByTotalPay(Request $request)
    {
        $inputNumber = $request->query('total_pay');

        $shifts = Shift::with('employee', 'company')->get();

        foreach ($shifts as $shift) {
            $totalPay = $shift->rate_per_hour * $shift->hours;
            $shift->total_pay = $totalPay;
        }

        $filteredShifts = $shifts->filter(function ($shift) use ($inputNumber) {
            return $inputNumber > $shift->total_pay;
        });

        event(new CachedDataChanged());

        return response()->json($filteredShifts, 200);
    }
}

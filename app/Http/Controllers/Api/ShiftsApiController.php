<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shift;
use App\Events\CachedDataChanged;
use Illuminate\Support\Facades\DB;

class ShiftsApiController extends Controller
{
    public function shiftsByTotalPay(Request $request)
    {
        $inputNumber = $request->query('total_pay');
        $pageNumber = $request->query('page');

        if (!$pageNumber) {
            $pageNumber=1;
        }

        if (! $inputNumber) {
            $inputNumber=0;
        }

        $filteredShifts = Shift::query()
        ->filterShiftByTotalPay($inputNumber)
        ->paginate(10,["*"],"page", $pageNumber);

        // $filteredShifts = Shift::join('companies', 'shifts.company_id', '=', 'companies.id')
        // ->join('employees', 'shifts.employee_id', '=', 'employees.id')
        // ->select('shifts.*', 'companies.name as company_name', 'employees.worker', 'shifts.rate_per_hour', 'shifts.hours')
        // ->whereRaw('shifts.rate_per_hour * shifts.hours > ?', [$inputNumber])
        // ->paginate(10,["*"],"page", $pageNumber);


        event(new CachedDataChanged());

        return response()->json($filteredShifts, 200);
    }
}

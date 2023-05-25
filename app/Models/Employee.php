<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Relations\HasShifts;
use App\Traits\Relations\BelongsToManyCompanies;
use Illuminate\Support\Facades\DB;

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

    public function getAveragePayPerHour($query,$id)
    {
        if(!$id){
            return abort(404);
        }
        $averagePayPerHour = $query->findOrFail($id)
        ->shifts()
        ->average('rate_per_hour');

        return $averagePayPerHour;
    }

    public function getLastFiveCompletedPayments($query,$id)
    {
        if(!$id){
            return abort(404);
        }
        $lastFiveCompletedPayments = $query->findOrFail($employee->id)
        ->shifts()
        ->with('company') 
        ->where('status', 'Complete')
        ->orderBy('paid_at', 'desc')
        ->take(5)
        ->get();

        return $lastFiveCompletedPayments;
    }

    public function getAverageTotalPay($query,$id)
    {
        if(!$id){
            return abort(404);
        }
        $averageTotalPay = $query->findOrFail($employee->id)
        ->shifts()
        ->where('status', 'Complete')
        ->avg(DB::raw('rate_per_hour * hours'));

        return $averageTotalPay;
    }
}

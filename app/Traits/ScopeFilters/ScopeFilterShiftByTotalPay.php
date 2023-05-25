<?php

namespace App\Traits\ScopeFilters;
/*
 * This trait contains filter shifts
 * @param query
 */
trait ScopeFilterShiftByTotalPay
{
    /**
     * @return 
     */
    public function scopeFilterShiftByTotalPay($query,$totalPay)
    {
        return $query->join('companies', 'shifts.company_id', '=', 'companies.id')
        ->join('employees', 'shifts.employee_id', '=', 'employees.id')
        ->select('shifts.*', 'companies.name as company_name', 'employees.worker', 'shifts.rate_per_hour', 'shifts.hours')
        ->whereRaw('shifts.rate_per_hour * shifts.hours > ?', [$totalPay]);
    }
}
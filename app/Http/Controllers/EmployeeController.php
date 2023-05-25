<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Employee;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->createView('Employee/Employees');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        $averagePayPerHour = $employee->getAveragePayPerHour($employee->id);
        $lastFiveCompletedPayments = $employee->getLastFiveCompletedPayments($employee->id);
        $averageTotalPay = $employee->getAverageTotalPay($employee->id);
        
        return $this->createView('Employee/EmployeeSummary',[
            'employee'=>$employee,
            'averagePayPerHour'=>$averagePayPerHour,
            'averageTotalPay'=>$averageTotalPay,
            'lastFivePayments'=> $lastFiveCompletedPayments,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }
}

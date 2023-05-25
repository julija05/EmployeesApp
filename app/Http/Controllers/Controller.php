<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Cache;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;
use App\Models\Shift;
use App\Models\Employee;
use App\Models\Company;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    protected array $cachedControllerData = [];
    protected array $templateValues = [];
    
    public function __construct()
    {
        $this->setCachedData();
        $this->setUpAllShifts();
        $this->setUpAllEmployees();
        $this->setUpAllComapnies();

    }

    protected function setCachedData()
    {
        $this->cachedControllerData['shifts'] = $this->getCachedDataForShifts();
        $this->cachedControllerData['employees'] = $this->getCachedDataForEmployees();
        $this->cachedControllerData['companies'] = $this->getCachedDataForCompanies();
    }

    private function getCachedDataForShifts()
    {
        return Cache::rememberForever('controllerData.shifts', function () {
            // get all shifts;
            return Shift::with('employee', 'company')->get();
        });
    }

    private function getCachedDataForEmployees()
    {
        return Cache::rememberForever('controllerData.employees', function () {
            // get all employees;
            return Employee::all();
        });
    }

    private function getCachedDataForCompanies()
    {
        return Cache::rememberForever('controllerData.companies', function () {
            // get all comapnies;
            return Company::all();
        });
    }

    private function setUpAllShifts(): void
    {
        $shifts = $this->cachedControllerData['shifts'];

        foreach ($shifts as $shift) {
            $totalPay = $shift->rate_per_hour * $shift->hours;
            $shift->total_pay = $totalPay;
        }
        $this->templateValues['shifts'] =  $shifts;
    }

    private function setUpAllEmployees(): void
    {
        $this->templateValues['employees'] =  $this->cachedControllerData['employees'];
    }

    private function setUpAllComapnies(): void
    {
        $this->templateValues['companies'] =  $this->cachedControllerData['companies'];
    }


    protected function createView(string $templateName, array $values = [])
    {
        $template = $this->templateValues;
        return Inertia::render($templateName, array_merge($template, $values));
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shift;
use App\Models\Employee;
use App\Models\Company;
use App\Events\CachedDataChanged;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\UploadFileRequest;

class UploadFileController extends Controller
{
    public function index()
    {
        return $this->createView('Welcome');
    }

    public function upload(UploadFileRequest $request)
    {
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            // Perform any necessary validations on the file (e.g., file type, size, etc.)
            $csvData = array_map('str_getcsv', file($file));
            $headers = array_shift($csvData);
            $requiredColumns = ['Company', 'Worker', 'Date', 'Hours', 'Rate per Hour', 'Status', 'Shift Type'];
            foreach ($csvData as $row) {

                $rowData = array_combine($headers, $row);
                $missingColumns = array_diff($requiredColumns, array_keys($rowData));
                if($missingColumns){
                    return redirect()->back()->withErrors(['message'=> 'This csv file has missing columns']);
                }
                $taxable = $rowData['Taxable'] == 'Yes' ? true : false;
                $ratePerHour = floatval(str_replace('£', '', $rowData['Rate per Hour']));
                $paidAt = !empty($rowData['Paid At']) ? $rowData['Paid At'] : null;

                $company = Company::firstOrCreate(['name' => $rowData['Company']]);
                
                // Check if the worker already exists
                $existingEmployee = Employee::where('worker', $rowData['Worker'])->first();
                
                if ($existingEmployee) {
                    // Assign the existing employee ID to the shift and employees_company
                    $employeeId = $existingEmployee->id;
                    $existingEmployee->companies()->syncWithoutDetaching([$company->id]);
                } else {
                    // Create a new employee
                    $newEmployee = Employee::create([
                        'worker' => $rowData['Worker'],
                        'taxable' => $taxable,
                    ]);
                    $employeeId = $newEmployee->id;
                    $newEmployee->companies()->attach($company->id);
                }

                // Create a new shift
                Shift::create([
                    'company_id' => $company->id,
                    'date' => $rowData['Date'],
                    'hours' => $rowData['Hours'],
                    'rate_per_hour' => $ratePerHour,
                    'status' => $rowData['Status'],
                    'shift_type' => $rowData['Shift Type'],
                    'paid_at' => $paidAt,
                    'employee_id' => $employeeId,
                ]);
            }
            event(new CachedDataChanged());

            return Redirect::route('employees.index');
        }

        return redirect()->back();
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shift;
use App\Models\Employee;
use App\Models\Company;

class UploadFileController extends Controller
{
    public function upload(Request $request)
    {
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            // Perform any necessary validations on the file (e.g., file type, size, etc.)

            $csvData = array_map('str_getcsv', file($file));
            $headers = array_shift($csvData);

            foreach ($csvData as $row) {
                $rowData = array_combine($headers, $row);
                $taxable = $rowData['Taxable'] === 'yes' ? true : false;
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

            return response()->json(['message' => 'File uploaded successfully']);
        }

        return response()->json(['message' => 'No file uploaded'], 400);
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreShiftRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'date'=> 'required|date',
            'employee_id'=> 'required|integer',
            'company_id'=> 'required|integer',
            'hours'=> 'required|integer',
            'rate_per_hour'=> 'required|numeric',
            'status'=> 'required|string',
            'shift_type'=> 'required|string',
            'paid_at'=> 'nullable|date',
        ];
    }
}

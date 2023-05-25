<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateShiftRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'date'=> 'date',
            'employee_id'=> 'integer',
            'company_id'=> 'integer',
            'hours'=> 'integer',
            'rate_per_hour'=> 'numeric',
            'status'=> 'string',
            'shift_type'=> 'string',
            'paid_at'=> 'nullable|date',
        ];
    }
}

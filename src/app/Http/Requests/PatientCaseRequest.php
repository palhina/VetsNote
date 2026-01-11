<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PatientCaseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $isUpdate = $this->isMethod('PUT') || $this->isMethod('PATCH');
        $requiredRule = $isUpdate ? 'sometimes|required' : 'required';

        return [
            'animal_type' => "{$requiredRule}|string|max:50",
            'breed' => 'nullable|string|max:100',
            'age' => 'nullable|integer|min:0|max:255',
            'sex' => 'nullable|string|max:20',
            'chief_complaint' => "{$requiredRule}|string|max:255",
            'history' => 'nullable|string',
            'examination' => 'nullable|string',
            'diagnosis' => 'nullable|string|max:255',
            'treatment' => 'nullable|string',
            'progress' => 'nullable|string',
            'memo' => 'nullable|string',
        ];
    }
}

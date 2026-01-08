<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SeminarNoteRequest extends FormRequest
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
            'seminar_name' => "{$requiredRule}|string|max:255",
            'held_on' => "{$requiredRule}|date",
            'lecturer' => 'nullable|string|max:255',
            'theme' => 'nullable|string|max:255',
            'content' => "{$requiredRule}|string",
        ];
    }
}

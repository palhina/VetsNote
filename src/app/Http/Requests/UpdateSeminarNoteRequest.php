<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSeminarNoteRequest extends FormRequest
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
        return [
            'seminar_name' => 'sometimes|required|string|max:255',
            'held_on' => 'sometimes|required|date',
            'lecturer' => 'nullable|string|max:255',
            'theme' => 'nullable|string|max:255',
            'content' => 'sometimes|required|string',
        ];
    }
}

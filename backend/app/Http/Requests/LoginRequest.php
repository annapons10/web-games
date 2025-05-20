<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        //Para decirle a laravel que el usuario está autorizado para hacer la petición,  para usar esta ruta: 
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    //Este método define las reglas de validación de los campos que esperas:
    //Si algo falla, 422 y mensaje de error:
    /*  {
        "errors": {
            "email": ["The email has already been taken."],
            "password": ["The password field is required."]
        }
    } */
    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ];
    }

    public function messages(){
        return [
            'email.required' => 'El campo email es obligatorio.',
            'email.email' => 'El campo email debe ser una dirección de correo electrónico válida.',
            'password.required' => 'El campo password es obligatorio.',
            'password.min' => 'El campo password debe tener al menos 8 caracteres.',
        ];
    }
}

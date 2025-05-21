<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
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
}

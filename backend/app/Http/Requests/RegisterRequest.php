<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
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
            //Primero valido datos con $request y su método que tiene los datos de la petición HTTP:
            //Si algo falla, laravel devuelve errores e intenta redirigir html, pero como es una api, lo que quiero es que devuelva un json (establezo esto en el headers del fetch): 
            "name" => 'required|string|max:255',
            "email" => 'required|email|unique:users,email',
            //Para que reciba el confirmed, en el front tiene que tener este name: password_confirmation: 
            "password" => 'required|confirmed|min:8', 
        ];
    } 
}

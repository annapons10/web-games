<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;



class AuthController extends Controller
{
    //
    public function login(Request $request){
        //Valido los datos:
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        //Si algo falla, 422 y mensaje de error:
       /*  {
            "errors": {
                "email": ["The email has already been taken."],
                "password": ["The password field is required."]
            }
        } */

        //Automáticamente Auth::attempt (se dirige a la tabla user y comprueba que es correcto) y devuelve true o false:
        if(Auth::attempt($credentials)){
            //Si son correctas, genero un token personal con el user correspondiente:
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            //Le mando el token y el front ya se encarga de él:
            return response()->json([
                'message' => 'Login exitoso',
                'user' => $user,
                'token' => $token,
            ], 200); 

        }else{
            //Si falla el login:
            return response()->json([
                'message' => 'Credenciales incorrectas'
            ], 401);
        }

    }

    public function register(Request $request){
        //Primero valido datos con $request y su método que tiene los datos de la petición HTTP:
        //Si algo falla, laravel devuelve errores e intenta redirigir html, pero como es una api, lo que quiero es que devuelva un json (establezo esto en el headers del fetch): 
        $validate = $request->validate([
            "name" => 'required|string|max:255',
            "email" => 'required|email|unique:users,email',
            //Para que reciba el confirmed, en el front tiene que tener este name: password_confirmation
            "password" => 'required|confirmed|min:8',
        ]);

        //Validate es un array asociativo que contiene los datos validados:
        //Así que, creo un nuevo modelo de user, añadiéndole estos datos:
        $user = User::create([
            'name' => $validate['name'],
            'email' => $validate['email'],
            'password' => Hash::make($validate['password']),
        ]);

        //Autentico al usuario recién creado:
        Auth::login($user);
        //Genero un token personal para el usuario:
        $token = $user->createToken('auth_token')->plainTextToken;

        //Retorno al front que todo ha ido bien, 201 Created success:
        return response()->json([
            'message' => 'Registro exitoso',
            'user' => $user,
            'token' => $token, 
        ], 201); 
        
    }

    public function logout(Request $request){
        //Revoca el token actual del usuario autenticado(lo elimina de la bd):
        $request->user()->currentAccessToken()->delete();

        //Retornar que el logout ha sido correcto:
        return response()->json([
            'message' => 'Logout exitoso',
        ], 200);

    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\Game;
use App\Models\Score; 


class AuthController extends Controller
{
    //
    public function login(LoginRequest $request){
        $validateCredentials = $request->validated(); 
        //Automáticamente Auth::attempt (se dirige a la tabla user y comprueba que es correcto) y devuelve true o false:
        if(Auth::attempt($validateCredentials)){
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

    public function register(RegisterRequest $request){
        //Antes de ejecutar el constructo, se valida en el RegisterRequest, si todo es correcto: 
        $validatedData  = $request->validated(); 
        //Validate es un array asociativo que contiene los datos validados:
        //Así que, creo un nuevo modelo de user, añadiéndole estos datos:
        $user = User::create([
            'name' => $validatedData ['name'],
            'email' => $validatedData ['email'],
            'password' => Hash::make($validatedData ['password']),
        ]);

        //Creo scores en 0 para cada juego que exista: 
        $games = Game::all();
        forEach($games as $game){
            Score::create([
                'user_id' => $user->id,
                'game_id' => $game->id,
                'score' => 0,
            ]); 
        } 

        //Autentico al usuario recién creado:
        Auth::login($user);
        //Genero un token personal para el usuario:
        $token = $user->createToken('auth_token')->plainTextToken;

        //Retorno al front que todo ha ido bien, 201 Created success:
        return response()->json([
            'message' => 'Registro exitoso',
            //load: eager loading, laravel carga los usuarios junto con sus scores(por su relación establecida): 
            'user' => $user->load('scores'),
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

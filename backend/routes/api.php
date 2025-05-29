<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GameController;
use App\Http\Controllers\Api\GenreController;
use App\Http\Controllers\Api\ScoreController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AuthController;


//Versiono ruta API:
Route::prefix('v1')->group(function(){
    //Rutas post para el registro y el login: 
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register',[ AuthController::class, 'register']);
    
    //Rutas Api: 
    Route::apiResource('games', GameController::class);
    Route::apiResource('genres', GenreController::class);
    Route::apiResource('scores', ScoreController::class);
    Route::apiResource('users', UserController::class);

    //Ruta protegida para ver los juegos y su puntuación, este middleware es el que valida el token devuelvo por front (guardado en la bd):
    //La ruta middleware le inyecta el usuario autenticado al $request, por eso luego se puede acceder a él directamente, o devuelve null : 
    //Va a la BD y comprueba si el token es válido, si no lo es devuelve un error 401: 
    Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']); 

}); 
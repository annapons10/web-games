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

    //Ruta protegida para ver los juegos y su puntuación: 
    /* Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum'); */
});
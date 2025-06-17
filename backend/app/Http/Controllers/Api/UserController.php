<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{ 

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //Por usuario concreto muestro sus scores con los games y genres. 
        //with() se usa para traer relaciones relacionadas al mismo tiempo que el modelo principal, para evitar hacer muchas consultas separadas (esto se llama eager loading).
        $user = User::with(['scores.game.genre'])->findOrFail($id); 
        return response()->json($user);
    }

   

    public function destroy(string $id)
    {
        //En la tabla BD en scores (Delete on cascade). Elimino el user y se eliminan los scores asociados a él. 
        $user = User::findOrFail($id);
        if(!$user){
            return response()->json(
                [
                    "message" => 'Usuario no encontrado'
                ], 404
            ); 
        }; 

        $user->delete(); 
        return response()->json(
                [
                    "message" => 'Usuario eliminado correctamente'
                ], 200
            ); 
        
    }
}

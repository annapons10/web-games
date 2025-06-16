<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //4
       /*  //Devuelvo los scores con su id de game y los datos de éstos. 
        //with() hace eager loading de relaciones entre modelos de Laravel.
        $users = User::with(['scores'])->get(); 
        return response()->json($users); */
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

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

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Score;

class ScoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(int $id)
    {
        //Hacer la suma aquí, si no necuentra el score, manda 404: 
        $score = Score::findOrFail($id);
        $score->score += 10;
        $score->save(); 
        $currentScore = $score->score;  
        return response()->json([
                'message' => 'Score + 10 actualizado correctamente', 
                'score' => $currentScore
        ]); 

    } 

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

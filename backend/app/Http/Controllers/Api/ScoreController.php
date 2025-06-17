<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Score;

class ScoreController extends Controller
{
   
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
    
}

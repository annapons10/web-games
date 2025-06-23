<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Score;

/**
 * @OA\Tag(name="Scores", description="Gestión de puntuaciones")
 */

class ScoreController extends Controller
{ 
    /**
     * @OA\Patch(
     *     path="api/v1/scores/{id}",
     *     summary="Incrementa una puntuación en 10 puntos",
     *     tags={"Scores"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Éxito",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Score +10 actualizado"),
     *             @OA\Property(property="score", type="integer", example=110)
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Score no encontrado",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="No query results for model [App\\Models\\Score] 123"
     *             )
     *         )
     *     )
     * )
     */
    public function update(int $id)
    {
        $score = Score::findOrFail($id);
        $score->score += 10;
        $score->save();
        $currentScore = $score->score;

        return response()->json([
            'message' => 'Score + 10 actualizado correctamente',
            'score' => $currentScore
        ], 200);
    }
} 
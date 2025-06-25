<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

/**
 * @OA\Tag(name="Users", description="Gestión de usuarios")
 */

class UserController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/users/{id}",
     *     summary="Obtiene un usuario específico con sus puntuaciones, juegos y géneros asociados",
     *     description="Devuelve todos los datos del usuario incluyendo sus puntuaciones en juegos y los géneros de esos juegos",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del usuario",
     *         @OA\Schema(
     *             type="integer",
     *             example=13
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Datos del usuario obtenidos correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="id", type="integer", example=13),
     *             @OA\Property(property="name", type="string", example="anna"),
     *             @OA\Property(property="email", type="string", example="anna@gmail.com"),
     *             @OA\Property(
     *                 property="scores",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="id", type="integer", example=37),
     *                     @OA\Property(property="score", type="integer", example=100),
     *                     @OA\Property(
     *                         property="game",
     *                         type="object",
     *                         @OA\Property(property="id", type="integer", example=1),
     *                         @OA\Property(property="name", type="string", example="Juego Ahorcado"),
     *                         @OA\Property(
     *                             property="genre",
     *                             type="object",
     *                             @OA\Property(property="id", type="integer", example=1),
     *                             @OA\Property(property="name", type="string", example="Palabras")
     *                         )
     *                     )
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Usuario no encontrado",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No query results for model [App\\Models\\User] 123")
     *          ) 
     *      )
     * )
     */

    public function show(string $id)
    {
        //Por usuario concreto muestro sus scores con los games y genres. 
        //with() se usa para traer relaciones relacionadas al mismo tiempo que el modelo principal, para evitar hacer muchas consultas separadas (esto se llama eager loading).
        $user = User::with(['scores.game.genre'])->findOrFail($id);
        return response()->json($user);
    }

    /**
 * @OA\Delete(
 *      path="/api/v1/users/{id}",
*       tags={"Users"},
 *      summary="Se elimina un usuario con sus puntuaciones asociadas",
 *      description="Elimina un usuario y sus puntuaciones asociadas. Si el usuario no existe, devuelve un mensaje de error.",
 *       @OA\Parameter(
 *          name="id",
 *          in="path",
 *          required=true,
 *          description="ID del usuario a eliminar",
 *          @OA\Schema(type="integer", example="123")
 *       ),
 *      @OA\Response(
 *           response=200,
 *           description="Usuario eliminado correctamente", 
 *            @OA\JsonContent(
 *                @OA\Property(property="message", type="string", example="Usuario eliminado correctamente")
 *            ) 
 *       ),
 *       @OA\Response(
 *           response=404,
 *           description="Usuario no encontrado",
 *           @OA\JsonContent(
 *               @OA\Property(property="message", type="string", example="Usuario no encontrado") 
 *            )
 *       ), 
 *     
 * )
 */


    public function destroy(string $id)
    {
        //En la tabla BD en scores (Delete on cascade). Elimino el user y se eliminan los scores asociados a él. 
        $user = User::findOrFail($id);
        if (!$user) {
            return response()->json(
                [
                    "message" => 'Usuario no encontrado'
                ],
                404
            );
        };

        $user->delete();
        return response()->json(
            [
                "message" => 'Usuario eliminado correctamente'
            ],
            200
        );
    }
}

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

/**
 * @OA\Tag(name="Authentication", description="Operaciones relacionadas con la autenticación de usuarios como login, registro y logout")
 */

class AuthController extends Controller
{
    //
    /**
     * @OA\Post(
     *     path="/api/v1/login",
     *     summary="Iniciar sesión de usuario",
     *     description="Permite a un usuario autenticarse con su email y contraseña para obtener un token de acceso",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "password"},
     *             @OA\Property(property="email", type="string", format="email", example="anna@gmail.com"),
     *             @OA\Property(property="password", type="string", format="password", example="12345678")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Login exitoso, devuelve el usuario y el token de acceso",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Login exitoso"),
     *             @OA\Property(property="user", type="object",
     *                 @OA\Property(property="id", type="integer", example=13),
     *                 @OA\Property(property="name", type="string", example="anna"),
     *                 @OA\Property(property="email", type="string", example="anna@gmail.com"),
     *                 @OA\Property(property="scores", type="array",
     *                     @OA\Items(
     *                         type="object",
     *                         @OA\Property(property="id", type="integer", example=37),
     *                         @OA\Property(property="score", type="integer", example=100),
     *                         @OA\Property(property="game_id", type="integer", example=1),
     *                         @OA\Property(property="user_id", type="integer", example=13)
     *                     )
     *                 )
     *             ),
     *             @OA\Property(property="token", type="string", example="64|IgvDTlML2k3j8f9g8h7j6k5l4m3n2o1p0q")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Credenciales incorrectas",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Credenciales incorrectas")
     *         )
     *     )
     * )
     */

    public function login(LoginRequest $request)
    {
        $validateCredentials = $request->validated();
        //Automáticamente Auth::attempt (se dirige a la tabla user y comprueba que es correcto) y devuelve true o false:
        if (Auth::attempt($validateCredentials)) {
            //Si son correctas, genero un token personal con el user correspondiente:
            // Es una instancia de User (modelo Eloquent): 
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            //Le mando el token y el front ya se encarga de él:
            return response()->json([
                'message' => 'Login exitoso',
                'user' => $user->load('scores'),
                'token' => $token,
            ], 200);
        } else {
            //Si falla el login:
            return response()->json([
                'message' => 'Credenciales incorrectas'
            ], 401);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/v1/register",
     *     summary="Registro de usuario",
     *     description="Se registra un nuevo usuario con nombre, email y contraseña. Crea puntuaciones iniciales para todos los juegos existentes en 0.",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "email", "password", "password_confirmation"},
     *             @OA\Property(property="name", type="string", example="anna"),
     *             @OA\Property(property="email", type="string", format="email", example="anna@gmail.com"),
     *             @OA\Property(property="password", type="string", format="password", example="12345678"),
     *             @OA\Property(property="password_confirmation", type="string", format="password", example="12345678")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Registro exitoso, devuelve el usuario y el token de acceso",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Registro exitoso"),
     *             @OA\Property(property="user", type="object",
     *                 @OA\Property(property="id", type="integer", example=13),
     *                 @OA\Property(property="name", type="string", example="anna"),
     *                 @OA\Property(property="email", type="string", example="anna@gmail.com"),
     *                 @OA\Property(property="scores", type="array",
     *                     @OA\Items(
     *                         type="object",
     *                         @OA\Property(property="id", type="integer", example=37),
     *                         @OA\Property(property="score", type="integer", example=100),
     *                         @OA\Property(property="game_id", type="integer", example=1),
     *                         @OA\Property(property="user_id", type="integer", example=13)
     *                     )
     *                 )
     *             ),
     *             @OA\Property(property="token", type="string", example="64|IgvDTlML2k3j8f9g8h7j6k5l4m3n2o1p0q")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Error inesperado al registrar el usuario",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Ocurrió un error inesperado al registrar el usuario")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Errores de validación",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Los datos enviados no son válidos."),
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *                 @OA\Property(
     *                     property="email",
     *                     type="array",
     *                     @OA\Items(type="string", example="El campo email es obligatorio.")
     *                 ),
     *                 @OA\Property(
     *                     property="password",
     *                     type="array",
     *                     @OA\Items(type="string", example="La contraseña debe tener al menos 8 caracteres.")
     *                 )
     *             )
     *         )
     *     )
     * )
     */
    public function register(RegisterRequest $request)
    {
        try {
            $validatedData = $request->validated();

            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
            ]);

            $games = Game::all();
            foreach ($games as $game) {
                Score::create([
                    'user_id' => $user->id,
                    'game_id' => $game->id,
                    'score' => 0,
                ]);
            }

            Auth::login($user);
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Registro exitoso',
                'user' => $user->load('scores'),
                'token' => $token,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error inesperado al registrar el usuario',
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *    path="/api/v1/logout",
     *   summary="Cerrar sesión de usuario",
     *  description="Permite a un usuario cerrar sesión eliminando su token de acceso actual",
     *  tags={"Authentication"},
     *  @OA\Response(
     *     response=200,
     *    description="Logout exitoso, el token de acceso ha sido eliminado",
     *   @OA\JsonContent(
     *        type="object",
     *      @OA\Property(property="message", type="string", example="Logout exitoso")
     *    )
     *   ),
     * @OA\Response(
     *   response=401,
     *  description="No autorizado, el usuario no está autenticado",
     * @OA\JsonContent(
     *       type="object",
     *    @OA\Property(property="message", type="string", example="Unauthenticated")
     *   )
     * ),
     * @OA\Response(
     *   response=500,
     * description="Error al cerrar sesión, no se pudo eliminar el token",
     * @OA\JsonContent(
     *       type="object",
     *    @OA\Property(property="message", type="string", example="No se pudo cerrar sesión, intente nuevamente.")
     *  ) 
     * )
     * )
     * 
     */
    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Logout exitoso',
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'No se pudo cerrar sesión, intente nuevamente.',
            ], 500); 
        }
    }
}

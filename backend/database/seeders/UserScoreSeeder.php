<?php

namespace Database\Seeders;

//CONTINUAR 
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Game;
use App\Models\Score;
use App\Models\User;


//CREO EL SEEDER PARA CREAR USUARIOS FALSOS COMO PUNTUACIONES A LA VEZ:
class UserScoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Creo 10 usuarios:
        User::factory(10)->create()->each(function ($user){
            //Cojo todos los juegos que existen: 
            $games = Game::all();
            //Recorro los juegos para crear puntuaciones: 
            foreach($games as $game){
                Score::create([
                    'user_id' => $user->id,
                    'game_id' => $game->id,
                    'score' => rand(0, 100)
                ]);
            }
        }); 


    }
}
/////CONTINUAR 
<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Game;
use App\Models\Genre;

//Usar SEEDERS para agregar datos predeterminados o de prueba:
class GenreGameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Creo nuevos registro en la tabla primero los géneros para tener su id al crear el juego:
        $palabras = Genre::create(['name' => 'Palabras']);
        $matematicas = Genre::create(['name' => 'Matemáticas']);
        $estrategia = Genre::create(['name' => 'Estrategia']);

        //Datos que cuando haga migrate, se agregarán directamente a la BD con "php artisan db:seed": 
        //Uso el modelo para referirme a esa tabla de mi BD, un método que Eloquent hace para insertar un nuevo registro:
        Game::create([
            'name' => 'Juego Ahorcado',
            'genre_id' => $palabras->id
        ]);
        Game::create([
            'name' => 'Juego Numérico',
            'genre_id' => $matematicas->id
        ]);
        Game::create([
            'name' => 'Juego Tres En Raya',
            'genre_id' => $estrategia->id
        ]);
    }
}

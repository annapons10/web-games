<?php

namespace Database\Seeders;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
//Laravel viene a este archivo y ejecuta todos los seeders añadiéndolos a la BD:

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //Llamo a los seeders para que se ejecuten: 
        $this->call([
            GenreGameSeeder::class
            //UserScoreSeeder::class,
        ]);
    }
}

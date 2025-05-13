<?php

namespace Database\Seeders;

//CONTINUAR 
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

//CREO EL SEEDER PARA CREAR USUARIOS FALSOS COMO PUNTUACIONES A LA VEZ:
class UserScoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Creo 10 usuarios:
        User::factory(10)->create()
    }
}
/////CONTINUAR 
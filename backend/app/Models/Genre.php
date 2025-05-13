<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Game;

class Genre extends Model
{
    
    //Poder asignar atributos masivamente: 
    protected $fillable = [
        'name'
    ]; 

    //Establecer relaciones: 
    public function games (){
        //Un género puede estar asignado a muchos games:
        return $this->hasMany(Game::class);
    }
   
   
}

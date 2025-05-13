<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Genre;
use App\Models\Score;

class Game extends Model
{
    //

    //Poder asignar atributos masivamente: 
    protected $fillable = [
        'name',
        'idGenre'
    ];

    //Establecer relaciones:
    public function genre(){
        //Un juego sólo puede tener un género:
        return $this->belongsTo(Genre::class);
    }

    public function score(){
        //Un juego sólo puede tener una puntuación:
        return $this->hasOne(Score::class);
    }
   
}

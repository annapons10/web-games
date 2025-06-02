<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Game;
use App\Models\User;

class Score extends Model
{
    
    protected $fillable = [
        'game_id',
        'user_id',
        'score'
    ];

    //Se establecen las relaciones:
    public function game(){
        //La puntuación pertenece a un juego:
        return $this->belongsTo(Game::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}

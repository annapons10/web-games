<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Game;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Score>
 */
class ScoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //Uso el modelo User para que vaya a la BD y recoja el primer id y se lo asigne:
            'user_id' => User::inRandomOrder()->first()->id,
            'game_id' => Game::inRandomOrder()->first()->id,
            'score' => $this->faker->numberBetween(0, 100),
        ];
    }
}

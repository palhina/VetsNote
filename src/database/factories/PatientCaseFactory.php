<?php

namespace Database\Factories;

use App\Models\PatientCase;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PatientCase>
 */
class PatientCaseFactory extends Factory
{
    protected $model = PatientCase::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'animal_type' => fake()->randomElement(['犬', '猫', 'ウサギ', 'ハムスター', '鳥']),
            'breed' => fake()->randomElement(['柴犬', 'トイプードル', 'アメリカンショートヘア', 'ミニレッキス']),
            'age' => fake()->numberBetween(1, 15),
            'sex' => fake()->randomElement(['オス', 'メス']),
            'chief_complaint' => fake()->sentence(),
            'history' => fake()->paragraph(),
            'examination' => fake()->paragraph(),
            'diagnosis' => fake()->sentence(),
            'treatment' => fake()->paragraph(),
            'progress' => fake()->paragraph(),
            'memo' => fake()->optional()->paragraph(),
        ];
    }
}

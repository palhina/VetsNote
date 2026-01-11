<?php

namespace Database\Factories;

use App\Models\SeminarNote;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SeminarNote>
 */
class SeminarNoteFactory extends Factory
{
    protected $model = SeminarNote::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'seminar_name' => fake()->sentence(3),
            'held_on' => fake()->date(),
            'lecturer' => fake()->name(),
            'theme' => fake()->sentence(),
            'content' => fake()->paragraphs(3, true),
        ];
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('patient_cases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('animal_type', 50);
            $table->string('breed', 100)->nullable();
            $table->tinyInteger('age')->unsigned()->nullable();
            $table->string('sex', 20)->nullable();
            $table->string('chief_complaint', 255)->nullable();
            $table->text('history')->nullable();
            $table->text('examination')->nullable();
            $table->string('diagnosis', 255)->nullable();
            $table->text('treatment')->nullable();
            $table->text('progress')->nullable();
            $table->text('memo')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patient_cases');
    }
};

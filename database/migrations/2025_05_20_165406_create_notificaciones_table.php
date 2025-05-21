<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('notificaciones', function (Blueprint $table) {
            $table->id();
            $table->string('tipo'); // 'nuevo_formulario', etc.
            $table->string('mensaje');
            $table->boolean('leida')->default(false);
            $table->json('data')->nullable(); // para enviar IDs o rutas
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('notificaciones');
    }
};
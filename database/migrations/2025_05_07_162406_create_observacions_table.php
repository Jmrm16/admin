<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('observaciones', function (Blueprint $table) {
            $table->id();
            $table->text('contenido');
            $table->string('fase');
            $table->enum('estado', ['pendiente', 'finalizado']); // o el estado que uses
            $table->unsignedBigInteger('formulario_medico_id');
            $table->unsignedBigInteger('creado_por'); // El usuario que hace la observación
            $table->timestamps();
    
            // Relaciones
            $table->foreign('formulario_medico_id')->references('id')->on('formularios_medicos')->onDelete('cascade');
            $table->foreign('creado_por')->references('id')->on('users')->onDelete('cascade');
        });
    }
    

    public function down(): void
    {
        Schema::dropIfExists('observaciones');
    }
};

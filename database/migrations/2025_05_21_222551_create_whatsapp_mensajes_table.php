<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up()
{
    Schema::create('whatsapp_mensajes', function (Blueprint $table) {
        $table->id();
        $table->foreignId('whatsapp_cliente_id')
              ->constrained('whatsapp_clientes')
              ->onDelete('cascade');

        $table->foreignId('enviado_por')
              ->nullable()
              ->constrained('users')
              ->onDelete('set null');

        $table->text('contenido');
        $table->enum('tipo', ['enviado', 'recibido']);
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('whatsapp_mensajes');
    }
};

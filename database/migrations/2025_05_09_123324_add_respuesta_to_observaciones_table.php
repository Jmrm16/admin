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
        Schema::table('observaciones', function (Blueprint $table) {
            $table->boolean('resuelta')->default(false); // o
            $table->text('respuesta')->nullable(); // si querés permitir una respuesta escrita
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('observaciones', function (Blueprint $table) {
            //
        });
    }
};

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
        if (Schema::hasTable('formularios_medicos') && ! Schema::hasColumn('formularios_medicos', 'estado')) {
            Schema::table('formularios_medicos', function (Blueprint $table) {
                $table->string('estado')->default('pendiente'); // otros posibles: en_proceso, aprobado, rechazado
            });
        }
    }

    public function down()
    {
        Schema::table('formularios_medicos', function (Blueprint $table) {
            $table->dropColumn('estado');
        });
    }
};

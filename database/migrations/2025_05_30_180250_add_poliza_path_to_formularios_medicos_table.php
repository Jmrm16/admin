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
    Schema::table('formularios_medicos', function (Blueprint $table) {
        $table->text('poliza_path')->nullable();
    });
}

public function down()
{
    Schema::table('formularios_medicos', function (Blueprint $table) {
        $table->dropColumn('poliza_path');
    });
}

};

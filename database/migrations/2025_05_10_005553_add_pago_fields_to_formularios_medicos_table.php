<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('formularios_medicos', function (Blueprint $table) {
            $table->text('link_pago')->nullable()->after('estado');
            $table->text('comprobante_pago_path')->nullable()->after('link_pago');
        });
    }

    public function down(): void
    {
        Schema::table('formularios_medicos', function (Blueprint $table) {
            $table->dropColumn('link_pago');
            $table->dropColumn('comprobante_pago_path');
        });
    }
};


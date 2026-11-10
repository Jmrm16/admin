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
        if (! Schema::hasTable('formularios_medicos')) {
            Schema::create('formularios_medicos', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
                $table->string('primer_apellido')->nullable();
                $table->string('segundo_apellido')->nullable();
                $table->string('nombres')->nullable();
                $table->string('tipo_documento')->nullable();
                $table->string('numero_identificacion')->nullable();
                $table->date('fecha_expedicion')->nullable();
                $table->string('lugar_expedicion')->nullable();
                $table->date('fecha_nacimiento')->nullable();
                $table->date('fecha')->nullable();
                $table->string('lugar_nacimiento')->nullable();
                $table->string('nacionalidad_1')->nullable();
                $table->string('nacionalidad_2')->nullable();
                $table->string('email')->nullable();
                $table->string('celular')->nullable();
                $table->string('direccion')->nullable();
                $table->string('ciudad_residencia')->nullable();
                $table->string('ciudad')->nullable();
                $table->string('sucursal')->nullable();
                $table->string('tipo_solicitud')->nullable();
                $table->string('clase_vinculacion')->nullable();
                $table->string('sector_actividad')->nullable();
                $table->string('cual')->nullable();
                $table->string('persona_pep')->nullable();
                $table->string('departamento')->nullable();
                $table->string('titulo_profesional')->nullable();
                $table->string('otorgado_por')->nullable();
                $table->date('fecha_graduacion')->nullable();
                $table->string('direccion_general')->nullable();
                $table->string('registro_profecional')->nullable();
                $table->string('especialidades')->nullable();
                $table->string('especialidad')->nullable();
                $table->string('especializaciones')->nullable();
                $table->json('equipos')->nullable();
                $table->string('suma_asegurada')->nullable();
                $table->string('ocupacion')->nullable();
                $table->string('cargo')->nullable();
                $table->string('empresa')->nullable();
                $table->string('actividad_principal')->nullable();
                $table->string('pdf_path')->nullable();
                $table->string('codigo_ciiu')->nullable();
                $table->string('direccion_empresa')->nullable();
                $table->string('ciudad_empresa')->nullable();
                $table->string('departamento_empresa')->nullable();
                $table->string('telefono_empresa')->nullable();
                $table->string('nombre_institucion')->nullable();
                $table->string('tipo_servicios')->nullable();
                $table->string('funcion_solicitante')->nullable();
                $table->string('relacion_institucion')->nullable();
                $table->string('nombre_empleador')->nullable();
                $table->string('ubicacion_trabajo')->nullable();
                $table->string('descripcion_labores')->nullable();
                $table->string('ejercicio_privado')->nullable();
                $table->string('ubicacion_consultorio')->nullable();
                $table->string('Numero_especializacion')->nullable();
                $table->string('equipo_radiografia')->nullable();
                $table->string('equipo_rayos_x')->nullable();
                $table->string('equipo_tomografia')->nullable();
                $table->string('equipo_laser')->nullable();
                $table->string('equipo_medicina_nuclear')->nullable();
                $table->string('alojar_pacientes')->nullable();
                $table->string('tratamiento_ambulatorio')->nullable();
                $table->string('otros_riesgos')->nullable();
                $table->string('ejercicio_exclusivo')->nullable();
                $table->string('prestacion_servicios')->nullable();
                $table->string('ejercicio_laboral')->nullable();
                $table->string('declaracion_salud')->nullable();
                $table->string('constancia_pago_path')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('documentos_usuario')) {
            Schema::create('documentos_usuario', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
                $table->unsignedBigInteger('formulario_medico_id')->nullable();
                $table->string('tipo')->nullable();
                $table->string('archivo')->nullable();
                $table->string('estado')->default('pendiente');
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('observaciones')) {
            Schema::create('observaciones', function (Blueprint $table) {
                $table->id();
                $table->text('contenido')->nullable();
                $table->string('fase')->nullable();
                $table->string('estado')->default('pendiente');
                $table->unsignedBigInteger('formulario_medico_id')->nullable();
                $table->unsignedBigInteger('creado_por')->nullable();
                $table->boolean('resuelta')->default(false);
                $table->text('respuesta')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('observaciones');
        Schema::dropIfExists('documentos_usuario');
        Schema::dropIfExists('formularios_medicos');
    }
};

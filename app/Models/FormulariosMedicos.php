<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FormulariosMedicos extends Model
{
    use HasFactory;

    protected $table = 'formularios_medicos';

    protected $fillable = [
        'estado',
        'user_id',
        'fecha',
        'sucursal',
        'ciudad',
        'tipo_solicitud',
        'clase_vinculacion',
        'sector_actividad',
        'cual',
        'persona_pep',
        'pdf_path',
        'primer_apellido',
        'segundo_apellido',
        'nombres',
        'tipo_documento',
        'numero_identificacion',
        'fecha_expedicion',
        'lugar_expedicion',
        'fecha_nacimiento',
        'lugar_nacimiento',
        'nacionalidad_1',
        'nacionalidad_2',
        'email',
        'celular',
        'direccion',
        'ciudad_residencia',
        'departamento',
        'titulo_profesional',
        'otorgado_por',
        'fecha_graduacion',
        'especialidad',
        'direccion_general',
        'registro_profecional',
        'actividad_principal',
        'suma_asegurada',
        'codigo_ciiu',
        'sector_actividad',
        'ocupacion',
        'cargo',
        'empresa',
        'direccion_empresa',
        'ciudad_empresa',
        'departamento_empresa',
        'telefono_empresa',
        'nombre_institucion',
        'tipo_servicios',
        'funcion_solicitante',
        'relacion_institucion',
        'nombre_empleador',
        'ubicacion_trabajo',
        'descripcion_labores',
        'ejercicio_privado',
        'ubicacion_consultorio',
        'Numero_especializacion',
        'equipo_radiografia',
        'equipo_rayos_x',
        'equipo_tomografia',
        'equipo_laser',
        'equipo_medicina_nuclear',
        'alojar_pacientes',
        'tratamiento_ambulatorio',
        'otros_riesgos',
        'ejercicio_exclusivo',
        'prestacion_servicios',
        'ejercicio_laboral',
        'ejercicio_otras_ocasiones',
        'reclamacion_responsabilidad',
        'circunstancia_responsabilidad',
        'seguro_responsabilidad',
        'rehusada_cancelada_poliza',
        'detalles_alojar_pacientes',
        'detalles_tratamiento_ambulatorio',
        'detalles_otros_riesgos',
        'detalles_ejercicio_otras_ocasiones',
        'detalles_reclamacion_responsabilidad',
        'detalles_circunstancia_responsabilidad',
        'detalles_rehusada_cancelada_poliza',
        'compania_seguros',
        'vigencia_poliza',
        'limite_asegurado',
        'ingresos_mensuales',
        'otros_ingresos',
        'concepto_otros_ingresos',
        'egresos_mensuales',
        'activos',
        'pasivos',
        'patrimonio',
        'pep',
        'vinculo_pep',
        'administra_recursos_publicos',
        'operaciones_internacionales',
        'detalles_operaciones_internacionales',
        'obligaciones_tributarias',
        'detalles_obligaciones_tributarias',
        'responsable_rut',
        'codigo_responsabilidad',
        'correo_dian',
        'autorizacion_datos',
        'especializaciones',
        'intermediario',
        'intermediario_in',
        'direccion_in',
        'fondos',
        

    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'fecha_expedicion' => 'date',
        'fecha_nacimiento' => 'date',
        'fecha_graduacion' => 'date',
        'fecha' => 'date',
        'vigencia_poliza' => 'date',
    
    ];

    // Relación con el modelo User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
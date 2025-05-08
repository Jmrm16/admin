<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Observacion extends Model
{
    protected $fillable = [
        'contenido',
        'fase',
        'estado',
        'formulario_medico_id',
        'creado_por',
    ];

    // Relación con el formulario médico
    public function formularioMedico()
    {
        return $this->belongsTo(FormulariosMedicos::class, 'formulario_medico_id');
    }

    // Relación con el usuario que crea la observación
    public function creadoPor()
    {
        return $this->belongsTo(User::class, 'creado_por');
    }
}

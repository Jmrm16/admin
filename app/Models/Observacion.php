<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Observacion extends Model
{
    protected $table = 'observaciones';

   protected $fillable = [
    'contenido',
    'fase',
    'estado',
    'formulario_medico_id',
    'creado_por',
    'resuelta',
    'respuesta',
];


    public function formularioMedico()
    {
        return $this->belongsTo(FormulariosMedicos::class, 'formulario_medico_id');
    }

    public function creadoPor()
    {
        return $this->belongsTo(User::class, 'creado_por');
    }
}

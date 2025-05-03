<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Documentos extends Model
{
    use HasFactory;

    protected $table = 'documentos_usuario'; // Asegúrate que coincide con tu tabla en la BD

    protected $fillable = [
        'user_id',
        'formulario_medico_id',
        'tipo',
        'archivo',
        'estado',
        // created_at y updated_at no necesitan estar en fillable
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relación con el usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relación con el formulario médico
    public function formularioMedico()
    {
        return $this->belongsTo(FormulariosMedicos::class, 'formulario_medico_id');
    }

    // Scope para documentos subidos
    public function scopeSubidos($query)
    {
        return $query->where('estado', 'subido');
    }

    // Scope para un tipo específico de documento
    public function scopeTipo($query, $tipo)
    {
        return $query->where('tipo', $tipo);
    }

    // Método para obtener el nombre legible del tipo de documento
    public function getTipoLegibleAttribute()
    {
        $tipos = [
            'documento_identidad' => 'Documento de Identidad',
            'certificado_existencia' => 'Certificado de Existencia',
            'estados_financieros' => 'Estados Financieros',
            'formulario_firmado' => 'Formulario Firmado'
        ];

        return $tipos[$this->tipo] ?? $this->tipo;
    }
}
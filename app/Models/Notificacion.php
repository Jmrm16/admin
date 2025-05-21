<?php
// app/Models/Notificacion.php

// app/Models/Notificacion.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notificacion extends Model
{
    protected $fillable = ['tipo', 'mensaje', 'leida', 'data'];

    protected $casts = [
        'leida' => 'boolean',
        'data' => 'array',
    ];

    protected $table = 'notificaciones'; // 👈 Asegura nombre correcto
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    protected $fillable = [
        'titulo',
        'descripcion',
        'fecha_evento',
        'video_url',
        'imagen_path',
    ];
}

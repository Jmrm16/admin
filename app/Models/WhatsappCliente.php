<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WhatsappCliente extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'numero', 'estado'];

    public function mensajes()
    {
        return $this->hasMany(WhatsappMensaje::class);
    }
}

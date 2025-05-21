<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WhatsappMensaje extends Model
{
    use HasFactory;

    protected $fillable = [
        'whatsapp_cliente_id',
        'enviado_por',
        'contenido',
        'tipo',
    ];

    public function cliente()
    {
        return $this->belongsTo(WhatsappCliente::class, 'whatsapp_cliente_id');
    }

    public function autor()
    {
        return $this->belongsTo(User::class, 'enviado_por');
    }
}

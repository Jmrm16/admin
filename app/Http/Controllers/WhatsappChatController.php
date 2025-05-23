<?php

namespace App\Http\Controllers;

use App\Models\WhatsappCliente;
use App\Models\WhatsappMensaje;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class WhatsappChatController extends Controller
{
    public function index()
    {
        $clientes = WhatsappCliente::with('mensajes')->get();

        return Inertia::render('Whatsapp/Chatbox', [
            'clientes' => $clientes,
        ]);
    }

    public function mensajes($clienteId)
    {
        return WhatsappMensaje::where('whatsapp_cliente_id', $clienteId)
            ->with('autor')
            ->orderBy('created_at')
            ->get();
    }


public function enviar(Request $request)
{
    $request->validate([
        'whatsapp_cliente_id' => 'required|exists:whatsapp_clientes,id',
        'contenido' => 'required|string',
    ]);

    $cliente = WhatsappCliente::findOrFail($request->whatsapp_cliente_id);

    // Validar que el número tenga formato internacional E.164
    // Si tu base ya lo guarda bien, puedes quitar esta línea
    $numero = preg_replace('/[^0-9]/', '', $cliente->numero); // solo dígitos

    // Enviar mensaje real a WhatsApp vía UltraMsg
    $response = Http::post("https://api.ultramsg.com/" . config('services.ultramsg.instance') . "/messages/chat", [
        'token' => config('services.ultramsg.token'),
        'to' => $numero,
        'body' => $request->contenido,
    ]);

    // Registrar el mensaje si fue exitoso
    if ($response->successful() && $response->json('sent')) {
        $cliente->mensajes()->create([
            'contenido' => $request->contenido,
            'tipo' => 'enviado',
            'enviado_por' => Auth::id(),
        ]);

        return response()->json(['success' => true, 'ultramsg' => $response->json()]);
    }

    return response()->json([
        'error' => 'No se pudo enviar el mensaje a WhatsApp.',
        'ultramsg_response' => $response->json(),
    ], 500);
}


    // (Opcional) Webhook para mensajes entrantes
public function webhook(Request $request)
{
    logger('📥 Webhook recibido:', $request->all());

    $data = $request->input('data');

    if (!$data || !isset($data['from']) || !isset($data['body'])) {
        return response()->json([
            'error' => 'Faltan campos en el payload (from o body)',
            'received' => $request->all(),
        ], 422);
    }

    // 💡 Normalizar número
    $numeroCompleto = $data['from'];
    $numeroLimpio = preg_replace('/@.*/', '', $numeroCompleto); // elimina @c.us, @g.us, etc.
    $mensaje = $data['body'];

    // Buscar o crear cliente por número limpio
    $cliente = WhatsappCliente::firstOrCreate(
        ['numero' => $numeroLimpio],
        ['nombre' => 'Sin nombre']
    );

    // Guardar mensaje
    WhatsappMensaje::create([
        'whatsapp_cliente_id' => $cliente->id,
        'contenido' => $mensaje,
        'tipo' => 'recibido',
    ]);

    logger("✅ Mensaje guardado de $numeroLimpio: $mensaje");

    return response()->json(['success' => true]);
}




}

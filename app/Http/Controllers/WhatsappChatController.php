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

        // Guardar el mensaje en base de datos
        $mensaje = WhatsappMensaje::create([
            'whatsapp_cliente_id' => $cliente->id,
            'enviado_por' => Auth::id(),
            'contenido' => $request->contenido,
            'tipo' => 'enviado',
        ]);

        // Enviar el mensaje a través de UltraMsg
        Http::post("https://api.ultramsg.com/instanceXXXX/messages/chat", [
            'token' => env('ULTRAMSG_TOKEN'),
            'to' => $cliente->numero,
            'body' => $request->contenido,
        ]);

        return response()->json(['success' => true]);
    }

    // (Opcional) Webhook para mensajes entrantes
    public function webhook(Request $request)
    {
        logger('Mensaje recibido desde UltraMsg', $request->all());

        // Procesar y guardar si coincide el número
        return response()->json(['ok' => true]);
    }
}

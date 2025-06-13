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
    // 💡 Ignorar mensajes que yo mismo envié (el bot)
if (isset($data['fromMe']) && $data['fromMe'] === true) {
    logger("🔁 Ignorado mensaje del bot: {$data['body']}");
    return response('OK', 200);
}


    if (!$data || !isset($data['from']) || !isset($data['body'])) {
        return response()->json([
            'error' => 'Faltan campos en el payload (from o body)',
            'received' => $request->all(),
        ], 422);
    }

    $numeroCompleto = $data['from'];
    $numeroLimpio = preg_replace('/@.*/', '', $numeroCompleto);
    $mensaje = trim($data['body']);

    // Buscar o crear cliente
    $cliente = WhatsappCliente::firstOrCreate(
        ['numero' => $numeroLimpio],
        ['nombre' => 'Sin nombre', 'estado' => 'inicio']
    );

    // 🔁 Evitar bucles: ¿ya recibimos este mismo mensaje hace menos de 10 segundos?
    $esDuplicado = $cliente->mensajes()
        ->where('contenido', $mensaje)
        ->where('tipo', 'recibido')
        ->where('created_at', '>=', now()->subSeconds(10))
        ->exists();

    if ($esDuplicado) {
        logger("⚠️ Mensaje duplicado ignorado: $mensaje");
        return response('OK', 200);
    }

    // Guardar mensaje recibido
    $cliente->mensajes()->create([
        'contenido' => $mensaje,
        'tipo' => 'recibido',
    ]);

    // 🚦 Lógica del chatbot
    $estado = $cliente->estado;
    $respuesta = '🤖 Lo siento, no entendí.';

    // Permitir reinicio con "hola"
    if (strtolower($mensaje) === 'hola') {
        $cliente->estado = 'inicio';
        $estado = 'inicio';
    }

    switch ($estado) {
        case 'inicio':
            $respuesta = '👋 ¡Hola! Por favor escribe tu nombre y cédula para continuar.';
            $cliente->estado = 'esperando_datos';
            break;

        case 'esperando_datos':
            $cliente->nombre = $mensaje;
            $cliente->estado = 'menu';
            $respuesta = "✅ Gracias, *{$mensaje}*.\nAhora selecciona una opción:\n1️⃣ Póliza Médica\n2️⃣ Póliza RCP";
            break;

        case 'menu':
            if ($mensaje === '1') {
                $cliente->estado = 'poliza_medica';
                $respuesta = '🩺 Has seleccionado *Póliza Médica*. ¿Deseas 1️⃣ Cotizar o 2️⃣ Consultar estado?';
            } elseif ($mensaje === '2') {
                $cliente->estado = 'poliza_rcp';
                $respuesta = '📄 Has seleccionado *Póliza RCP*. ¿Deseas 1️⃣ Cotizar o 2️⃣ Consultar estado?';
            } else {
                $respuesta = '❌ Opción no válida. Escribe 1 o 2.';
            }
            break;

        case 'poliza_medica':
        case 'poliza_rcp':
            if ($mensaje === '1') {
                $respuesta = '📄 Perfecto. Pronto te contactaremos para cotizar tu póliza.';
                $cliente->estado = 'finalizado';
            } elseif ($mensaje === '2') {
                $respuesta = '🔎 Por favor escribe tu número de documento para verificar el estado.';
                $cliente->estado = 'esperando_documento';
            } else {
                $respuesta = '❌ Escribe 1 para cotizar o 2 para consultar estado.';
            }
            break;

        case 'esperando_documento':
            $respuesta = "✅ Gracias. Estamos consultando el estado de tu póliza con cédula *{$mensaje}*. Pronto te responderemos.";
            $cliente->estado = 'finalizado';
            break;

        case 'finalizado':
            $respuesta = '✅ Gracias por comunicarte. Si deseas comenzar otra consulta, escribe "Hola".';
            break;
    }

    $cliente->save();

    // Registrar respuesta solo si hay algo que decir
    if ($respuesta) {
        $cliente->mensajes()->create([
            'contenido' => $respuesta,
            'tipo' => 'enviado',
        ]);

        // Enviar mensaje real por UltraMsg
        Http::post("https://api.ultramsg.com/" . config('services.ultramsg.instance') . "/messages/chat", [
            'token' => config('services.ultramsg.token'),
            'to' => $numeroLimpio,
            'body' => $respuesta,
        ]);
    }

    return response('OK', 200);
}





}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WhatsappController extends Controller
{
    public function enviarMensaje()
{
    $instanceId = 'instance120576';
    $token = 'pwr6i6ojht9xb15p';
    $telefono = '573007609718'; // número con código de país
    $mensaje = '¡Hola! Este es un mensaje automático desde mi chatbot.';

    $response = Http::get("https://api.ultramsg.com/{$instanceId}/messages/chat", [
        'token' => $token,
        'to' => $telefono,
        'body' => $mensaje,
    ]);

    if ($response->successful()) {
        return response()->json(['success' => true]);
    } else {
        return response()->json(['error' => 'No se pudo enviar el mensaje'], 500);
    }
}
public function webhookUltraMsg(Request $request)
{
    $data = $request->all();

    $mensajeRecibido = $data['body'] ?? '';
    $numero = $data['from'] ?? '';

    if (str_contains(strtolower($mensajeRecibido), 'hola')) {
        // responder automáticamente
        $this->enviarMensajeAutomatico($numero, '¡Hola! ¿En qué puedo ayudarte?');
    }

    return response('OK', 200);
}

private function enviarMensajeAutomatico($telefono, $mensaje)
{
    $instanceId = 'instance120576';
    $token = 'pwr6i6ojht9xb15p';

    Http::get("https://api.ultramsg.com/{$instanceId}/messages/chat", [
        'token' => $token,
        'to' => $telefono,
        'body' => $mensaje,
    ]);
}

}

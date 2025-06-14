<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Observacion;
use App\Models\FormulariosMedicos;
use App\Models\Notificacion;
use Illuminate\Support\Facades\Auth;

class ObservacionesController extends Controller
{
    public function store(Request $request, $formularioId)
    {
        $request->validate([
            'fase' => 'required|string',
            'contenido' => 'required|string|max:1000',
        ]);

        $formulario = FormulariosMedicos::findOrFail($formularioId);

        $observacion = new Observacion([
            'fase' => $request->fase,
            'contenido' => $request->contenido,
            'estado' => 'pendiente',
            'creado_por' => Auth::id(),
        ]);

        $formulario->observaciones()->save($observacion);


        // ✅ Crear notificación
        Notificacion::create([
            'tipo' => 'nueva_observacion',
            'mensaje' => "Nueva observación agregada en la fase '{$observacion->fase}' del formulario #{$formulario->id} por " . Auth::user()->name,
            'leida' => false,
            'data' => [
                'formulario_id' => $formulario->id,
                'observacion_id' => $observacion->id,
                'fase' => $observacion->fase,
                'contenido' => $observacion->contenido, // ✅ contenido de la observación
                'usuario_id' => $formulario->user_id,
                'admin_id' => $formulario->admin_id,
                'creado_por' => Auth::id(),
            ],
        ]);


        return response()->json([
            'message' => 'Observación agregada exitosamente',
            'observacion' => [
                'id' => $observacion->id,
                'contenido' => $observacion->contenido,
                'fase' => $observacion->fase,
                'estado' => $observacion->estado,
                'creado_en' => $observacion->created_at->diffForHumans(),
                'creado_por' => [
                    'id' => Auth::id(),
                    'name' => Auth::user()->name,
                ],
            ],
        ]);
    }
}

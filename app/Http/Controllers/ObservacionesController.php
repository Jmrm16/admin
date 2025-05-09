<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Observacion;
use App\Models\FormulariosMedicos;
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
        // Preparar respuesta manual sin usar Resource
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

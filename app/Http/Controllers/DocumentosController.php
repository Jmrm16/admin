<?php

namespace App\Http\Controllers;

use App\Models\Documentos;
use App\Models\FormulariosMedicos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DocumentosController extends Controller
{
    /**
     * Mostrar lista de documentos de un usuario
     */
public function index(Request $request, $userId)
{
    $formularioId = $request->query('formulario_medico_id');

    $tiposFormulario = ['formulario_sarlaft', 'formulario_medico', 'formulario_oficio'];

    // 1. Documentos generales (por usuario)
    $documentosGenerales = Documentos::where('user_id', $userId)
        ->whereNotIn('tipo', $tiposFormulario)
        ->get();

    // 2. Documentos especiales (solo por formulario_id, NO por user_id)
    $documentosFormulario = collect();
    if ($formularioId) {
        $documentosFormulario = Documentos::whereIn('tipo', $tiposFormulario)
            ->where('formulario_medico_id', $formularioId)
            ->get();
    }

    // Combinar ambos
    $documentos = $documentosGenerales->merge($documentosFormulario);

    return Inertia::render('FormulariosMedicos/Documentos', [
        'documentos' => $documentos,
        'userId' => $userId,
        'formularioId' => $formularioId,
    ]);
}




    /**
     * Guardar o reemplazar documento para un usuario específico
     */
public function store(Request $request, $userId)
{
    $tiposConFormulario = ['formulario_sarlaft', 'formulario_medico', 'formulario_oficio'];

    $request->validate([
        'tipo' => 'required|string',
        'archivo' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
        'formulario_medico_id' => [
            function ($attribute, $value, $fail) use ($request, $tiposConFormulario) {
                if (in_array($request->tipo, $tiposConFormulario) && !$value) {
                    $fail("El campo formulario_medico_id es obligatorio para el tipo {$request->tipo}.");
                }
            },
        ],
    ]);

    $tipo = $request->tipo;
    $archivo = $request->file('archivo');
    $nombre = time() . '_' . $archivo->getClientOriginalName();
    $ruta = $archivo->storeAs("documentos_usuario/{$userId}", $nombre, 'public');

    $formularioId = in_array($tipo, $tiposConFormulario) ? $request->formulario_medico_id : null;

    $query = Documentos::where('user_id', $userId)->where('tipo', $tipo);
    if ($formularioId) {
        $query->where('formulario_medico_id', $formularioId);
    }

    $documento = $query->first();

    if ($documento) {
        if (Storage::disk('public')->exists(str_replace('app/public/', '', $documento->archivo))) {
            Storage::disk('public')->delete(str_replace('app/public/', '', $documento->archivo));
        }

        $documento->update([
            'archivo' => "app/public/{$ruta}",
            'estado' => 'subido',
            'formulario_medico_id' => $formularioId, // ✅ Agregado
        ]);
    } else {
        Documentos::create([
            'user_id' => $userId,
            'formulario_medico_id' => $formularioId,
            'tipo' => $tipo,
            'archivo' => "app/public/{$ruta}",
            'estado' => 'subido',
        ]);
    }

    return response()->json(['success' => true, 'message' => 'Documento subido correctamente.']);
}




    /**
     * Eliminar un documento
     */
    public function destroy($id)
    {
        $documento = Documentos::findOrFail($id);

        if (Storage::disk('public')->exists(str_replace('app/public/', '', $documento->archivo))) {
            Storage::disk('public')->delete(str_replace('app/public/', '', $documento->archivo));
        }

        $documento->delete();

        return response()->json(['success' => true, 'message' => 'Documento eliminado.']);
    }
}

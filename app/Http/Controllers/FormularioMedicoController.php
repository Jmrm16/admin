<?php

namespace App\Http\Controllers;

use App\Models\FormulariosMedicos;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Documentos;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Models\Notificacion;

class FormularioMedicoController extends Controller
{
    public function index()
    {
        $query = FormulariosMedicos::with(['user', 'admin'])->latest();

        if (!Auth::user()->is_admin) {
            $query->where('admin_id', Auth::id());
        }

        $formularios = $query->paginate(10);

        return Inertia::render('FormulariosMedicos/Index', [
            'formularios' => $formularios,
        ]);
    }

        public function show(FormulariosMedicos $formularioMedico)
        {
            // Recargamos por si viene sin user_id
            if (is_null($formularioMedico->admin_id)) {
                $formularioMedico = FormulariosMedicos::with('user')->findOrFail($formularioMedico->id);

                $formularioMedico->admin_id = Auth::id();
                $formularioMedico->estado = 'pendiente';
                $formularioMedico->save();

                Notificacion::create([
                    'tipo' => 'asignacion_admin',
                    'mensaje' => "El formulario #{$formularioMedico->id} ha sido asignado al admin " . Auth::user()->name,
                    'leida' => false,
                    'data' => [
                        'formulario_id' => $formularioMedico->id,
                        'admin_id' => Auth::id(),
                        'usuario_id' => $formularioMedico->user_id,
                    ],
                ]);
            }

            return Inertia::render('FormulariosMedicos/Show', [
                'formulario' => $formularioMedico->load([
                    'user',
                    'admin',
                    'observaciones.creadoPor',
                ]),
            ]);
        }



    public function guardarPago(Request $request, $id)
    {
        $request->validate([
            'link_pago' => 'required|url',
        ]);

        $formulario = FormulariosMedicos::findOrFail($id);

        $formulario->link_pago = $request->link_pago;
        $formulario->save();

        Notificacion::create([
            'tipo' => 'link_pago',
            'mensaje' => "Se guardó un link de pago para el formulario #{$formulario->id}.",
            'leida' => false,
            'data' => [
                'formulario_id' => $formulario->id,
                'admin_id' => $formulario->admin_id,
                'usuario_id' => $formulario->user_id,
                'link_pago' => $request->link_pago,
            ],
        ]);

        return response()->json(['message' => 'Link de pago guardado correctamente']);
    }

    public function subirComprobantePago(Request $request, $id)
    {
        $request->validate([
            'documento' => 'required|file|mimes:pdf|max:5120',
        ]);

        $formulario = FormulariosMedicos::findOrFail($id);

        $file = $request->file('documento');
        $nombreArchivo = 'comprobante_pago_' . time() . '.pdf';

        $ruta = $file->storeAs("formularios/{$id}/comprobantes", $nombreArchivo, 'public');

        $formulario->comprobante_pago_path = Storage::url("formularios/{$id}/comprobantes/{$nombreArchivo}");
        $formulario->save();

        Notificacion::create([
            'tipo' => 'comprobante_pago',
            'mensaje' => "Se subió un comprobante de pago para el formulario #{$formulario->id}.",
            'leida' => false,
            'data' => [
                'formulario_id' => $formulario->id,
                'admin_id' => $formulario->admin_id,
                'usuario_id' => $formulario->user_id,
            ],
        ]);

        return response()->json(['message' => 'Comprobante de pago guardado correctamente']);
    }

    public function subirConstanciaPago(Request $request, $id)
    {
        $request->validate([
            'documento' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        $formulario = FormulariosMedicos::findOrFail($id);

        $file = $request->file('documento');
        $extension = $file->getClientOriginalExtension();
        $nombreArchivo = 'constancia_pago_' . time() . '.' . $extension;

        $ruta = $file->storeAs("constancias/{$id}", $nombreArchivo, 'public');

        $formulario->constancia_pago_path = Storage::url($ruta);
        $formulario->save();

        Notificacion::create([
            'tipo' => 'constancia_pago',
            'mensaje' => "Se subió una constancia de pago para el formulario #{$formulario->id}.",
            'leida' => false,
            'data' => [
                'formulario_id' => $formulario->id,
                'admin_id' => $formulario->admin_id,
                'usuario_id' => $formulario->user_id,
            ],
        ]);

        return response()->json([
            'message' => 'Constancia subida correctamente.',
            'url' => Storage::url($ruta),
        ]);
    }

public function subirPoliza(Request $request, $id)
{
    try {
        $request->validate([
            'documento' => 'required|file|mimes:pdf|max:5120',
        ]);

        $formulario = FormulariosMedicos::findOrFail($id);

        $file = $request->file('documento');
        $nombreArchivo = 'poliza_' . time() . '.pdf';

        $ruta = $file->storeAs("formularios/{$id}/polizas", $nombreArchivo, 'public');

        $formulario->poliza_path = Storage::url($ruta);
        // ❌ Ya no cambiamos el estado aquí
        $formulario->save();

        Notificacion::create([
            'tipo' => 'poliza_subida',
            'mensaje' => "Se subió una póliza para el formulario #{$formulario->id}.",
            'leida' => false,
            'data' => json_encode([
                'formulario_id' => $formulario->id,
                'admin_id' => $formulario->admin_id,
                'usuario_id' => $formulario->user_id,
            ]),
        ]);

        return response()->json([
            'message' => 'Póliza subida correctamente.',
            'url' => Storage::url($ruta),
        ]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}



}

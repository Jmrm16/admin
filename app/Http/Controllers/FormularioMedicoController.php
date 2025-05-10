<?php

namespace App\Http\Controllers;

use App\Models\FormulariosMedicos;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Documentos;
use Illuminate\Support\Facades\Auth;


class FormularioMedicoController extends Controller
{
    public function index()
    {
        $query = FormulariosMedicos::with(['user', 'admin'])->latest();
    
        if (!Auth::user()->is_admin) {
            // Mostrar los formularios donde el admin asignado sea el usuario logueado
            $query->where('admin_id', Auth::id());
        }
    
        $formularios = $query->paginate(10);
    
        return Inertia::render('FormulariosMedicos/Index', [
            'formularios' => $formularios,
        ]);
    }
    
    public function show(FormulariosMedicos $formularioMedico)
    {
        
        // Solo asigna si aún no tiene un admin asignado
        if (is_null($formularioMedico->admin_id)) {
            $formularioMedico->admin_id = Auth::id();
            $formularioMedico->save();
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

    return response()->json(['message' => 'Link de pago guardado correctamente']);
}




}
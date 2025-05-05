<?php

namespace App\Http\Controllers;

use App\Models\FormulariosMedicos;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Documentos;

class FormularioMedicoController extends Controller
{
    public function index()
    {
        $formularios = FormulariosMedicos::with('user')->latest()->get();
        dd($formularios);

        return Inertia::render('FormulariosMedicos/Index', [
            'formularios' => $formularios,
        ]);

    }

    public function show(FormulariosMedicos $formularioMedico)
    {
        
        return Inertia::render('FormulariosMedicos/Show', [
            'formulario' => $formularioMedico->load('user'),
        ]);
    }

    


    public function iniciarTramite($id)
{
    $formulario = FormulariosMedicos::findOrFail($id);

    // Verifica si ya hay un administrador asignado
    if ($formulario->admin_id) {
        return redirect()->back()->with('error', 'Este formulario ya tiene un administrador asignado.');
    }

    // Asigna el administrador actual
    $formulario->admin_id = auth()->id();
    $formulario->estado = 'en_tramite'; // Puedes definir los estados según tu lógica
    $formulario->save();

    return redirect()->route('formularios.show', $formulario->id)->with('success', 'Trámite iniciado exitosamente.');
}

    
}

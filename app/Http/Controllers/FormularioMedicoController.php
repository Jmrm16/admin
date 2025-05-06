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
        // Puedes usar paginación o obtener todos los formularios
        $formularios = FormulariosMedicos::with('admin')->paginate(10); // Paginación
    
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
            'formulario' => $formularioMedico->load('user', 'admin'),
        ]);
    }
    




    
}

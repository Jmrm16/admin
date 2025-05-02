<?php

namespace App\Http\Controllers;

use App\Models\FormulariosMedicos;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
    
}

<?php

namespace App\Http\Controllers;

use App\Models\FormularioMedico;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FormularioMedicoController extends Controller
{
    public function index()
    {
        $formularios = FormularioMedico::with('user')->latest()->get();

        return Inertia::render('FormulariosMedicos/Index', [
            'formularios' => $formularios,
        ]);
    }

    public function show(FormularioMedico $formularioMedico)
    {
        return Inertia::render('FormulariosMedicos/Show', [
            'formulario' => $formularioMedico->load('user'),
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Documentos;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
public function index($formularioId)
{
    // Trae los documentos solo de ese formulario
    $documentos = Documentos::where('formulario_medico_id', $formularioId)->get();

    return Inertia::render('FormulariosMedicos/Documentos', [
        'documentos' => $documentos,
        'formularioId' => $formularioId,
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Documentos $documentos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Documentos $documentos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Documentos $documentos)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Documentos $documentos)
    {
        //
    }
}

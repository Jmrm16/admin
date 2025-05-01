<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\FormulariosMedicos;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsuariosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $usuarios = User::select('id', 'name', 'email')->get();
    
        return Inertia::render('Usuarios/Index', [
            'usuarios' => $usuarios,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $usuario = User::with(['formulariosMedicos' => function($query) {
            $query->select([
                'id', 'user_id', 'fecha', 'sucursal', 'ciudad', 'tipo_solicitud', 
                'primer_apellido', 'segundo_apellido', 'nombres', 'pdf_path',
                'created_at'
            ])->latest();
        }])->findOrFail($id);
    
        return Inertia::render('Usuarios/Profile', [
            'usuario' => $usuario,
            'formularios' => $usuario->formulariosMedicos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Usuarios/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        User::create($validated);

        return redirect()->route('usuarios.index')->with('success', 'Usuario creado exitosamente');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $usuario = User::findOrFail($id);
        
        return Inertia::render('Usuarios/Edit', [
            'usuario' => $usuario,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $usuario = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$usuario->id,
            'password' => 'nullable|string|min:8',
        ]);

        if (empty($validated['password'])) {
            unset($validated['password']);
        }

        $usuario->update($validated);

        return redirect()->route('usuarios.index')->with('success', 'Usuario actualizado exitosamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $usuario = User::findOrFail($id);
        $usuario->delete();

        return redirect()->route('usuarios.index')->with('success', 'Usuario eliminado exitosamente');
    }
}
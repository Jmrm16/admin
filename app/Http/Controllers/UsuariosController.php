<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\FormulariosMedicos;
use App\Models\Notificacion;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UsuariosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $usuarios = User::where('role', 'cliente')
    ->select('id', 'name', 'email')
    ->get();

    
        return Inertia::render('Usuarios/Index', [
            'usuarios' => $usuarios,
        ]);
    }



         public function admins()
        {
            $usuarios = User::where('role', 'admin')->get();
            return Inertia::render('Usuarios/Admins', [
                'usuarios' => $usuarios,
            ]);
        }


    /**
     * Display the specified resource.
     */
public function show($id)
{
    $usuario = User::findOrFail($id);

    if ($usuario->role === 'admin') {
        // Si es admin, obtener formularios donde admin_id = id
        $formularios = FormulariosMedicos::where('admin_id', $usuario->id)
            ->select([
                'id', 'user_id', 'fecha', 'sucursal', 'ciudad', 'tipo_solicitud',
                'primer_apellido', 'segundo_apellido', 'nombres', 'pdf_path', 'estado',
                'created_at', 'tipo_proceso', 'admin_id'
            ])
            ->with('user:id,name,email') // para mostrar info del cliente
            ->latest()
            ->get();
    } else {
        // Si es cliente, usar la relación ya definida
        $usuario->load(['formulariosMedicos' => function($query) {
            $query->select([
                'id', 'user_id', 'fecha', 'sucursal', 'ciudad', 'tipo_solicitud',
                'primer_apellido', 'segundo_apellido', 'nombres', 'pdf_path', 'estado',
                'created_at', 'tipo_proceso', 'admin_id'
            ])->latest();
        }]);
        $formularios = $usuario->formulariosMedicos;
    }

    return Inertia::render('Usuarios/Profile', [
        'usuario' => $usuario,
        'formularios' => $formularios,
        'esAdmin' => $usuario->role === 'admin',
    ]);
}

public function showAdmin($id)
{
    $admin = User::where('role', 'admin')->findOrFail($id);

    $formulariosAsignados = FormulariosMedicos::where('admin_id', $admin->id)
        ->select([
            'id', 'user_id', 'fecha', 'sucursal', 'ciudad', 'tipo_solicitud',
            'primer_apellido', 'segundo_apellido', 'nombres', 'pdf_path', 'estado',
            'created_at', 'tipo_proceso', 'admin_id'
        ])
        ->latest()
        ->get();

    $emitidas = $formulariosAsignados->where('estado', 'finalizado')->count();

    return Inertia::render('Usuarios/AdminProfile', [
        'admin' => $admin,
        'formularios' => $formulariosAsignados,
        'emitidas' => $emitidas,
        'asignadas' => $formulariosAsignados->count(),
    ]);
}


    public function cambiarEstado(Request $request, $id)
    {
        $request->validate([
            'estado' => 'required|in:pendiente,revision,expedicion,proceso_pago,constancia_pago,poliza,finalizado',
        ]);

        $formulario = FormulariosMedicos::findOrFail($id);
        $estadoAnterior = $formulario->estado;

        // Solo si el estado es diferente al actual
        if ($estadoAnterior !== $request->estado) {
            $formulario->estado = $request->estado;
            $formulario->save();

            // Guardar la notificación
            Notificacion::create([
                'tipo' => 'cambio_estado',
                'mensaje' => "El formulario #{$formulario->id} cambió de estado de '{$estadoAnterior}' a '{$formulario->estado}'.",
                'leida' => false,
                'data' => [
                    'formulario_id' => $formulario->id,
                    'admin_id' => $formulario->admin_id,
                    'usuario_id' => $formulario->user_id,
                    'estado_anterior' => $estadoAnterior,
                    'estado_nuevo' => $formulario->estado,
                    'modificado_por' => Auth::user()->name,
                ],
            ]);
        }

        return response()->json(['message' => 'Estado actualizado exitosamente']);
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
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:6',
        'role' => 'required|in:admin,cliente', // Aquí está el campo que debes validar
    ]);

    $user = \App\Models\User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => bcrypt($validated['password']),
        'role' => $validated['role'], // Aquí se guarda correctamente
    ]);

    return redirect()->route('usuarios.index')->with('success', 'Usuario creado correctamente.');
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
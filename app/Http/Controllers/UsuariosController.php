<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\FormulariosMedicos;
use App\Models\Notificacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UsuariosController extends Controller
{
    // ========================
    // INDEX - CLIENTES
    // ========================
public function index()
{
    // 1. Solo los campos que necesitas
    $usuarios = DB::table('users')
        ->where('role', 'cliente')
        ->select('id', 'name', 'email', 'created_at')
        ->orderByDesc('created_at')
        //->limit(1000) // Descomenta si tienes MUCHOS usuarios
        ->get();

    // 2. Convierte a array simple (más rápido que Eloquent Collection)
    $usuarios = json_decode(json_encode($usuarios), true);

    return Inertia::render('Usuarios/Index', [
        'usuarios' => $usuarios,
    ]);
}





    // ========================
    // INDEX - ADMINISTRADORES
    // ========================
    public function admins()
    {
        $usuarios = User::where('role', 'admin')
            ->select('id', 'name', 'email')
            ->get();

        return Inertia::render('Usuarios/Admins', [
            'usuarios' => $usuarios,
        ]);
    }

    // ========================
    // SHOW - PERFIL DE USUARIO
    // ========================
// ========================
// SHOW - PERFIL DE USUARIO
// ========================
public function show($id)
{
    $usuario = User::findOrFail($id);

    if ($usuario->role === 'admin') {
        // Admin: obtener formularios asignados
        $formularios = FormulariosMedicos::where('admin_id', $usuario->id)
            ->with(['user:id,name,email', 'admin:id,name']) // Agregar relación con admin
            ->select([
                'id', 'user_id', 'fecha', 'sucursal', 'ciudad', 'tipo_solicitud',
                'primer_apellido', 'segundo_apellido', 'nombres', 'pdf_path', 'estado',
                'created_at', 'tipo_proceso', 'admin_id'
            ])
            ->latest()
            ->get();
    } else {
        // Cliente: usar relación definida con eager loading para admin
        $usuario->load(['formulariosMedicos' => function ($query) {
            $query->with(['admin:id,name']) // Agregar relación con admin
                ->select([
                    'id', 'user_id', 'fecha', 'sucursal', 'ciudad', 'tipo_solicitud',
                    'primer_apellido', 'segundo_apellido', 'nombres', 'pdf_path', 'estado',
                    'created_at', 'tipo_proceso', 'admin_id'
                ])
                ->latest();
        }]);

        $formularios = $usuario->formulariosMedicos;
    }

    return Inertia::render('Usuarios/Profile', [
        'usuario' => $usuario,
        'formularios' => $formularios,
        'esAdmin' => $usuario->role === 'admin',
    ]);
}
    // ========================
    // PERFIL DE ADMINISTRADOR
    // ========================
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

    // ========================
    // CAMBIAR ESTADO DE FORMULARIO
    // ========================
    public function cambiarEstado(Request $request, $id)
    {
        $request->validate([
            'estado' => 'required|in:pendiente,revision,expedicion,proceso_pago,constancia_pago,poliza,finalizado',
        ]);

        $formulario = FormulariosMedicos::findOrFail($id);
        $estadoAnterior = $formulario->estado;

        if ($estadoAnterior !== $request->estado) {
            $formulario->estado = $request->estado;
            $formulario->save();

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

    // ========================
    // CREAR USUARIO
    // ========================
 
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'required|in:admin,cliente',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => $validated['role'],
        ]);

        return redirect()->route('usuarios.admins')->with('success', 'Usuario creado correctamente.');
    }

    // ========================
    // EDITAR USUARIO
    // ========================
    public function edit($id)
    {
        $usuario = User::findOrFail($id);

        return Inertia::render('Usuarios/Edit', [
            'usuario' => $usuario,
        ]);
    }

    public function update(Request $request, $id)
    {
        $usuario = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $usuario->id,
            'password' => 'nullable|string|min:8',
        ]);

        if (empty($validated['password'])) {
            unset($validated['password']);
        } else {
            $validated['password'] = bcrypt($validated['password']);
        }

        $usuario->update($validated);

        return redirect()->route('usuarios.index')->with('success', 'Usuario actualizado exitosamente.');
    }

    // ========================
    // ELIMINAR USUARIO
    // ========================
    public function destroy($id)
    {
        $usuario = User::findOrFail($id);
        $usuario->delete();

        return redirect()->route('usuarios.index')->with('success', 'Usuario eliminado exitosamente.');
    }
}

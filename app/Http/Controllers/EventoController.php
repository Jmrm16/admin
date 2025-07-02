<?php

namespace App\Http\Controllers;

use App\Models\Evento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventoController extends Controller
{
    // 🔍 Listar eventos (vista admin)
    public function index()
    {
        $eventos = Evento::orderByDesc('fecha_evento')->paginate(10);

        return Inertia::render('eventos/Index', [ // 👈 CORREGIDO
            'eventos' => $eventos,
        ]);
    }

    // ➕ Mostrar formulario de creación
    public function create()
    {
        return Inertia::render('eventos/Create'); // 👈 CORREGIDO
    }

    // ✅ Guardar nuevo evento
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'fecha_evento' => 'required|date',
            'video_url' => 'nullable|url',
            'imagen' => 'nullable|image|max:2048',
        ]);

        $evento = new Evento($request->only('titulo', 'descripcion', 'fecha_evento', 'video_url'));

        if ($request->hasFile('imagen')) {
            $ruta = $request->file('imagen')->store('eventos', 'public');
            $evento->imagen_path = Storage::url($ruta);
        }

        $evento->save();

        return redirect()->route('eventos.index')->with('success', 'Evento creado correctamente.');
    }

    // 🖊️ Editar evento
    public function edit(Evento $evento)
    {
        return Inertia::render('eventos/Edit', [ // 👈 CORREGIDO
            'evento' => $evento,
        ]);
    }

    // 💾 Actualizar evento
    public function update(Request $request, Evento $evento)
    {


        $request->merge([
        'titulo' => $request->get('titulo'),
        'descripcion' => $request->get('descripcion'),
        'fecha_evento' => $request->get('fecha_evento'),
        'video_url' => $request->get('video_url'),
    ]);

        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'fecha_evento' => 'required|date',
            'video_url' => 'nullable|url',
            'imagen' => 'nullable|image|max:2048',
        ]);

        $evento->fill($request->only('titulo', 'descripcion', 'fecha_evento', 'video_url'));

        if ($request->hasFile('imagen')) {
            if ($evento->imagen_path) {
                $path = str_replace('/storage/', '', $evento->imagen_path);
                Storage::disk('public')->delete($path);
            }

            $ruta = $request->file('imagen')->store('eventos', 'public');
            $evento->imagen_path = Storage::url($ruta);
        }

        $evento->save();

        return redirect()->route('eventos.index')->with('success', 'Evento actualizado correctamente.');
    }

    // ❌ Eliminar evento
    public function destroy(Evento $evento)
    {
        if ($evento->imagen_path) {
            $path = str_replace('/storage/', '', $evento->imagen_path);
            Storage::disk('public')->delete($path);
        }

        $evento->delete();

        return redirect()->route('eventos.index')->with('success', 'Evento eliminado correctamente.');
    }
}

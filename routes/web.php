<?php

use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\DocumentosController;

use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FormularioMedicoController;
use App\Models\FormulariosMedicos;

// REGISTRAR EL MIDDLEWARE AQUÍ
Route::aliasMiddleware('role', RoleMiddleware::class);


// Ruta pública (welcome page)
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Rutas de Usuarios protegidas solo para ADMIN
Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    
    Route::resource('usuarios', UsuariosController::class)->except([]);
  
    Route::post('/formularios-medicos/{id}/estado', [UsuariosController::class, 'cambiarEstado'])->name('formularios.cambiarEstado');

Route::get('/formularios-medicos/{id}', function ($id) {
    $formulario = FormulariosMedicos::findOrFail($id);
    return inertia('FormulariosMedicos/Show', ['formulario' => $formulario]);
});


    // Mostrar todos los documentos de un usuario
    Route::get('/documentos/{userId}', [DocumentosController::class, 'index'])->name('documentos.index');

    // Ver documento PDF en el navegador
    Route::get('/documentos/{userId}', [DocumentosController::class, 'index'])->name('documentos.index');


    // Descargar documento PDF
    Route::get('/documentos/descargar/{id}', [DocumentosController::class, 'descargar'])->name('documentos.descargar');



// Ruta para ver el PDF del formulario
Route::get('pdf/ver2/{id}', [PDFController::class, 'llenarPDF2']);
Route::get('pdf/ver/{id}', [PDFController::class, 'verPDF']);







});

// Rutas del dashboard accesibles para cualquier usuario autenticado
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::resource('formularios-medicos', FormularioMedicoController::class)->only(['index', 'show']);
});


// Otros settings y auth
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

<?php

use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\DocumentosController;

use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FormularioMedicoController;
use App\Http\Controllers\ObservacionesController;
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

    Route::get('/formularios-medicos/{formularioMedico}', [FormularioMedicoController::class, 'show'])->name('formularios-medicos.show');


    // Mostrar todos los documentos de un usuario
    Route::get('/documentos/{userId}', [DocumentosController::class, 'index'])->name('documentos.index');

    Route::get('/formularios-medicos', [FormularioMedicoController::class, 'index'])->name('formularios.index');
    Route::get('/formularios-medicos/{id}', [FormularioMedicoController::class, 'show'])->name('formularios.show');




    // Descargar documento PDF
    Route::get('/documentos/descargar/{id}', [DocumentosController::class, 'descargar'])->name('documentos.descargar');



// Ruta para ver el PDF del formulario
Route::get('pdf/ver2/{id}', [PDFController::class, 'llenarPDF2']);
Route::get('pdf/ver/{id}', [PDFController::class, 'verPDF']);


Route::post('/formularios-medicos/{id}/iniciar-tramite', [FormularioMedicoController::class, 'iniciarTramite'])->name('formularios.iniciarTramite');


Route::post('/formularios-medicos/{id}/observaciones', [ObservacionesController::class, 'store'])
    ->name('observaciones.store');


});
Route::get('/formularios/{id}/observaciones', [ObservacionesController::class, 'getObservaciones']);
Route::post('/formularios-medicos/{id}/proceso-pago', [FormularioMedicoController::class, 'guardarPago']);
Route::post('/formularios-medicos/{id}/comprobante-pago', [FormularioMedicoController::class, 'subirComprobantePago'])
    ->middleware(['auth', 'verified', 'role:admin']);


// Rutas del dashboard accesibles para cualquier usuario autenticado
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {

});





// Otros settings y auth
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

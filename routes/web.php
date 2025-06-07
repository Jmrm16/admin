<?php

use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\DocumentosController;
use App\Http\Controllers\WhatsappController;
use App\Http\Controllers\DashboardController;

use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FormularioMedicoController;
use App\Http\Controllers\ObservacionesController;
use App\Models\FormulariosMedicos;
use App\Http\Controllers\WhatsappChatController;
use App\Models\Notificacion;

// REGISTRAR EL MIDDLEWARE AQUÍ
Route::post('/api/notificaciones/{id}/leer', function ($id) {
    Notificacion::where('id', $id)->update(['leida' => true]);
    return response()->json(['ok' => true]);
});

Route::aliasMiddleware('role', RoleMiddleware::class);


// Ruta pública (welcome page)
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


    Route::post('/webhook-ultramsg', [WhatsappChatController::class, 'webhook']);

    Route::post('/formularios-medicos/{id}/poliza', [FormularioMedicoController::class, 'subirPoliza'])
    ->middleware(['auth', 'verified', 'role:admin'])
    ->name('formulario.subir_poliza');


// Rutas de Usuarios protegidas solo para ADMIN
Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {

  
    Route::post('/usuarios', [UsuariosController::class, 'store'])->name('usuarios.store');
    Route::get('/usuarios/admins', [UsuariosController::class, 'admins'])->name('usuarios.admins');
    Route::get('/usuarios/admins/{id}', [UsuariosController::class, 'showAdmin'])->name('usuarios.admins.show');




    
Route::get('/whatsapp', fn () => Inertia::render('whatsapp'));
// routes/web.php



Route::get('/api/notificaciones/no-leidas', function () {
    return Notificacion::where('leida', false)
        ->orderBy('created_at', 'desc')
        ->take(5)
        ->get();
});

Route::post('/formulario/{id}/constancia-pago', [FormularioMedicoController::class, 'subirConstanciaPago'])
    ->name('formulario.constancia_pago');


Route::post('/api/notificaciones/marcar-leidas', function () {
    Notificacion::where('leida', false)->update(['leida' => true]);
    return response()->json(['ok' => true]);
});




Route::get('/whatsapp/enviar', [WhatsappController::class, 'enviarMensaje']);
//Route::post('/webhook-ultramsg', [WhatsappController::class, 'webhookUltraMsg']);

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');


    
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


    Route::get('/whatsapp', [WhatsappChatController::class, 'index'])->name('whatsapp.index');
    Route::get('/whatsapp/clientes/{id}/mensajes', [WhatsappChatController::class, 'mensajes'])->name('whatsapp.mensajes');
    Route::post('/whatsapp/enviar', [WhatsappChatController::class, 'enviar'])->name('whatsapp.enviar');


});
Route::get('/formularios/{id}/observaciones', [ObservacionesController::class, 'getObservaciones']);
Route::post('/formularios-medicos/{id}/proceso-pago', [FormularioMedicoController::class, 'guardarPago']);
Route::post('/formularios-medicos/{id}/comprobante-pago', [FormularioMedicoController::class, 'subirComprobantePago'])
    ->middleware(['auth', 'verified', 'role:admin']);


// Rutas del dashboard accesibles para cualquier usuario autenticado



Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {

});





// Otros settings y auth
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\{
    UsuariosController,
    PDFController,
    DocumentosController,
    WhatsappController,
    DashboardController,
    FormularioMedicoController,
    ObservacionesController,
    WhatsappChatController
};

use App\Models\Notificacion;
use App\Http\Middleware\RoleMiddleware;

// Registrar middleware alias
Route::aliasMiddleware('role', RoleMiddleware::class);

// ✅ TODAS las rutas dentro del prefijo /admin
Route::prefix('admin')->group(function () {

    // Ruta base redirige al login
    Route::get('/', function () {
        return redirect()->route('login');
    })->name('home');

    // Webhook público
    Route::post('/webhook-ultramsg', [WhatsappChatController::class, 'webhook']);

    // Ruta para ver observaciones públicas (cliente)
    Route::get('/formularios/{id}/observaciones', [ObservacionesController::class, 'getObservaciones']);

    // Subida de constancia de pago por cliente
    Route::post('/formulario/{id}/constancia-pago', [FormularioMedicoController::class, 'subirConstanciaPago'])->name('formulario.constancia_pago');

    // API de notificaciones
    Route::post('/api/notificaciones/{id}/leer', function ($id) {
        Notificacion::where('id', $id)->update(['leida' => true]);
        return response()->json(['ok' => true]);
    });

    Route::get('/api/notificaciones/no-leidas', function () {
        return Notificacion::where('leida', false)
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();
    });

    Route::post('/api/notificaciones/marcar-leidas', function () {
        Notificacion::where('leida', false)->update(['leida' => true]);
        return response()->json(['ok' => true]);
    });

    // Rutas protegidas para administradores
    Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {

        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Usuarios
        Route::post('/usuarios', [UsuariosController::class, 'store'])->name('usuarios.store');
        Route::get('/usuarios/admins', [UsuariosController::class, 'admins'])->name('usuarios.admins');
        Route::get('/usuarios/admins/{id}', [UsuariosController::class, 'showAdmin'])->name('usuarios.admins.show');
        Route::resource('usuarios', UsuariosController::class)->except([]);

        // Formularios médicos
        Route::get('/formularios-medicos', [FormularioMedicoController::class, 'index'])->name('formularios.index');
        Route::get('/formularios-medicos/{id}', [FormularioMedicoController::class, 'show'])->name('formularios-medicos.show');
        Route::post('/formularios-medicos/{id}/poliza', [FormularioMedicoController::class, 'subirPoliza'])->name('formulario.subir_poliza');
        Route::post('/formularios-medicos/{id}/estado', [UsuariosController::class, 'cambiarEstado'])->name('formularios.cambiarEstado');
        Route::post('/formularios-medicos/{id}/iniciar-tramite', [FormularioMedicoController::class, 'iniciarTramite'])->name('formularios.iniciarTramite');
        Route::post('/formularios-medicos/{id}/observaciones', [ObservacionesController::class, 'store'])->name('observaciones.store');
        Route::post('/formularios-medicos/{id}/proceso-pago', [FormularioMedicoController::class, 'guardarPago']);
        Route::post('/formularios-medicos/{id}/comprobante-pago', [FormularioMedicoController::class, 'subirComprobantePago']);

        // Documentos
        Route::get('/documentos/{userId}', [DocumentosController::class, 'index'])->name('documentos.index');
        Route::get('/documentos/descargar/{id}', [DocumentosController::class, 'descargar'])->name('documentos.descargar');

        // PDF
        Route::get('/pdf/ver/{id}', [PDFController::class, 'verPDF']);
        Route::get('/pdf/ver2/{id}', [PDFController::class, 'llenarPDF2']);

        // WhatsApp chat CRM
        Route::get('/whatsapp', [WhatsappChatController::class, 'index'])->name('whatsapp.index');
        Route::get('/whatsapp/clientes/{id}/mensajes', [WhatsappChatController::class, 'mensajes'])->name('whatsapp.mensajes');
        Route::post('/whatsapp/enviar', [WhatsappChatController::class, 'enviar'])->name('whatsapp.enviar');
        Route::get('/whatsapp/enviar', [WhatsappController::class, 'enviarMensaje']);
    });
});

// Otros settings y auth
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

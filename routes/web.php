<?php

use App\Http\Controllers\UsuariosController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FormularioMedicoController;

// REGISTRAR EL MIDDLEWARE AQUÍ
Route::aliasMiddleware('role', RoleMiddleware::class);


// Ruta pública (welcome page)
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Rutas de Usuarios protegidas solo para ADMIN
Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::resource('usuarios', UsuariosController::class)->except([]);
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

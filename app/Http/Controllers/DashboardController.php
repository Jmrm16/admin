<?php

// app/Http/Controllers/DashboardController.php

namespace App\Http\Controllers;

use App\Models\FormulariosMedicos;
use App\Models\Notificacion;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $clientes = User::where('role', 'cliente')->count();
        $admins = User::where('role', 'admin')->count();
        $total = User::count();

        $totalPolizas = FormulariosMedicos::count();
        $polizasFinalizadas = FormulariosMedicos::where('estado', 'finalizado')->count();
        $polizasProceso = FormulariosMedicos::where('estado', '!=', 'finalizado')->count();
        $ingresosTotales = FormulariosMedicos::sum('suma_asegurada');

        $estados = FormulariosMedicos::select('estado', DB::raw('count(*) as total'))
            ->groupBy('estado')
            ->get()
            ->toArray();

        $dateFormat = DB::getDriverName() === 'sqlite' ? "strftime('%Y-%m', fecha)" : 'DATE_FORMAT(fecha, "%Y-%m")';
        $porMes = FormulariosMedicos::selectRaw("{$dateFormat} as mes, COUNT(*) as total")
            ->groupBy('mes')
            ->orderBy('mes')
            ->get();

        $notificaciones = Notificacion::latest()->take(5)->get();

        return Inertia::render('dashboard', [
            'clientes' => $clientes,
            'admins' => $admins,
            'total' => $total,
            'totalPolizas' => $totalPolizas,
            'polizasFinalizadas' => $polizasFinalizadas,
            'polizasProceso' => $polizasProceso,
            'ingresosTotales' => $ingresosTotales,
            'estados' => $estados,
            'porMes' => $porMes,
            'notificaciones' => $notificaciones,
        ]);
    }
}

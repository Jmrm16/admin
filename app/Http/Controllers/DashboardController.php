<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'clientes' => User::where('role', 'cliente')->count(),
            'admins' => User::where('role', 'admin')->count(),
            'total' => User::count(),
        ]);
    }
}

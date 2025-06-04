import { Head } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import AppLayout from '@/layouts/app-layout';
import { MetricCard } from '@/components/MetricCard';
import { FileText, DollarSign, Users, CheckCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { ComponentType } from 'react';

interface Props {
  clientes: number;
  admins: number;
  total: number;
  totalPolizas: number;
  polizasFinalizadas: number;
  polizasProceso: number;
  ingresosTotales: number;
  estados?: { estado: string; total: number }[];
  porMes?: { mes: string; total: number }[];
  notificaciones?: { id: number; mensaje: string; created_at: string }[];
}

const colors = ['#f87171', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa', '#fb923c'];

export default function Dashboard(props: Props) {
  const estados = props.estados ?? [];
  const porMes = props.porMes ?? [];
  const notificaciones = props.notificaciones ?? [];

  return (
    <AppLayout>
      <Head title="Dashboard" />

      {/* Tarjetas métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        <MetricCard title="Clientes" value={props.clientes} icon={Users} color="cyan" detail="Registrados" />
        <MetricCard title="Admins" value={props.admins} icon={Users} color="purple" detail="Gestionando" />
        <MetricCard title="Usuarios" value={props.total} icon={Users} color="blue" detail="En total" />
        <MetricCard title="Pólizas Totales" value={props.totalPolizas} icon={FileText} color="green" detail="Registradas" />
        <MetricCard title="Pólizas Finalizadas" value={props.polizasFinalizadas} icon={CheckCircle} color="emerald" detail="Emitidas" />
        <MetricCard title="Pólizas en Proceso" value={props.polizasProceso} icon={RefreshCw} color="yellow" detail="En trámite" />
        <MetricCard
          title="Ingresos Totales"
          value={props.ingresosTotales.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
          icon={DollarSign}
          color="rose"
          detail="Por suma asegurada"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
        {/* PieChart: Estados */}
        <motion.div
          className="bg-zinc-900 p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-lg font-bold text-white mb-4">Pólizas por Estado</h2>
          {estados.length > 0 ? (
            <PieChart width={340} height={300}>
              <Pie
                data={estados}
                dataKey="total"
                nameKey="estado"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {estados.map((_, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" align="center" verticalAlign="bottom" />
            </PieChart>
          ) : (
            <p className="text-sm text-gray-400">No hay datos disponibles.</p>
          )}
        </motion.div>

        {/* BarChart: Por mes */}
        <motion.div
          className="bg-zinc-900 p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-lg font-bold text-white mb-4">Pólizas por Mes</h2>
          {porMes.length > 0 ? (
            <BarChart width={500} height={300} data={porMes}>
              <XAxis dataKey="mes" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="total" fill="#a78bfa" radius={[10, 10, 0, 0]} />
            </BarChart>
          ) : (
            <p className="text-sm text-gray-400">No hay datos disponibles.</p>
          )}
        </motion.div>
      </div>

      {/* Notificaciones */}
      <motion.div
        className="p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="bg-zinc-900 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-bold text-white mb-4">Últimas Notificaciones</h2>
          {notificaciones.length > 0 ? (
            <ul className="space-y-2">
              {notificaciones.map((n) => (
                <li key={n.id} className="text-sm border-b border-zinc-800 py-2 text-slate-300">
                  {n.mensaje}{' '}
                  <span className="text-xs text-slate-500">
                    ({new Date(n.created_at).toLocaleString('es-CO')})
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No hay notificaciones recientes.</p>
          )}
        </div>
      </motion.div>
    </AppLayout>
  );
}

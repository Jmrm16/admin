import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { MetricCard } from '@/components/MetricCard';
import { Cpu } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
interface DashboardProps {
  clientes: number;
  admins: number;
  total: number;
}


export default function Dashboard({ clientes, admins, total }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min md:grid grid-cols-1 md:grid-cols-4 gap-6 p-6-cols-3">
                    
                <MetricCard
                title="Clientes"
                value={clientes}
                icon={Cpu}
                color="cyan"
                detail={`${clientes} registrados`}
                />
                <MetricCard
                title="Administradores"
                value={admins}
                icon={Cpu}
                color="purple"
                detail={`${admins} registrados`}
                />
                <MetricCard
                title="Usuarios"
                value={total}
                icon={Cpu}
                color="blue"
                detail={`${total} registrados`}
                />
                   
                    
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}

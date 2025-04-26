import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, router } from '@inertiajs/react'; // Importamos router

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios2',
        href: '/usuarios2',
    },
];

// 👇 Aquí defines el tipo de props que recibes
interface UsuariosIndexProps {
    usuarios: {
        id: number;
        name: string;
        email: string;
    }[]; 
}

export default function UsuariosIndex({ usuarios }: UsuariosIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min p-4">
                    <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {usuarios.map((usuario) => (
                            <Card key={usuario.id}>
                                <CardContent className="p-4">
                                    <h2
                                        className="text-lg font-semibold cursor-pointer"
                                        onClick={() => router.visit(`/usuarios/${usuario.id}`)} // Redirige al perfil del usuario
                                    >
                                        {usuario.name}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">{usuario.email}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

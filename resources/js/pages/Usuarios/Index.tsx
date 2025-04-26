import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: '/usuarios',
    },
];

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
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min p-4 bg-background dark:bg-black">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-white">Lista de Usuarios</h1>
                        <Button asChild className="bg-primary text-white hover:bg-primary/90">
                            <Link href="/usuarios/create">Agregar Cliente</Link>
                        </Button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-800 text-white border rounded-lg">
                            <thead className="bg-gray-700 text-gray-300 uppercase text-sm">
                                <tr>
                                    <th className="py-3 px-6 text-left">ID</th>
                                    <th className="py-3 px-6 text-left">Nombre</th>
                                    <th className="py-3 px-6 text-left">Email</th>
                                    <th className="py-3 px-6 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-200">
                                {usuarios.map((usuario) => (
                                    <tr key={usuario.id} className="border-b border-gray-600 hover:bg-gray-700">
                                        <td className="py-3 px-6">{usuario.id}</td>
                                        <td className="py-3 px-6">{usuario.name}</td>
                                        <td className="py-3 px-6">{usuario.email}</td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex justify-center space-x-2">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    size="sm"
                                                    className="bg-gray-600 text-white hover:bg-gray-500"
                                                >
                                                    <Link href={`/usuarios/${usuario.id}/edit`}>Editar</Link>
                                                </Button>
                                                <Button
                                                    asChild
                                                    variant="destructive"
                                                    size="sm"
                                                    className="bg-red-600 hover:bg-red-500 text-white"
                                                >
                                                    <Link href={`/usuarios/${usuario.id}/delete`} method="delete" as="button">
                                                        Eliminar
                                                    </Link>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}

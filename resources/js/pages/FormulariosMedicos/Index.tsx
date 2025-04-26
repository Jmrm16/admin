import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Formulario {
    id: number;
    fecha: string;
    sucursal: string;
    tipo_solicitud: string;
    user: {
        name: string;
        email: string;
    };
}

interface Props {
    formularios: Formulario[];
}

export default function FormulariosIndex({ formularios }: Props) {
    return (
        <AppLayout>
            <Head title="Formularios Médicos" />

            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Listado de Formularios Médicos</h1>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800 text-white rounded-lg">
                        <thead className="bg-gray-700 text-gray-300 uppercase text-sm">
                            <tr>
                                <th className="py-3 px-6 text-left">ID</th>
                                <th className="py-3 px-6 text-left">Cliente</th>
                                <th className="py-3 px-6 text-left">Sucursal</th>
                                <th className="py-3 px-6 text-left">Tipo de Solicitud</th>
                                <th className="py-3 px-6 text-left">Fecha</th>
                                <th className="py-3 px-6 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-200">
                            {formularios.map((formulario) => (
                                <tr key={formulario.id} className="border-b border-gray-600 hover:bg-gray-700">
                                    <td className="py-3 px-6">{formulario.id}</td>
                                    <td className="py-3 px-6">{formulario.user?.name ?? 'N/A'}</td>
                                    <td className="py-3 px-6">{formulario.sucursal}</td>
                                    <td className="py-3 px-6">{formulario.tipo_solicitud}</td>
                                    <td className="py-3 px-6">{formulario.fecha ? new Date(formulario.fecha).toLocaleDateString() : ''}</td>
                                    <td className="py-3 px-6 text-center">
                                        <Link
                                            href={`/formularios-medicos/${formulario.id}`}
                                            className="text-blue-400 hover:underline"
                                        >
                                            Ver Detalle
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}

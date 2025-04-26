import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

interface FormularioMedico {
    id: number;
    created_at: string;
    // Agrega más campos si quieres
}

interface ProfileProps {
    usuario: {
        id: number;
        name: string;
        email: string;
    };
    formulariosMedicos: FormularioMedico[];
}

export default function Profile({ usuario, formulariosMedicos }: ProfileProps) {
    return (
        <AppLayout>
            <Head title={`Perfil de ${usuario.name}`} />

            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Perfil de {usuario.name}</h1>
                <p className="mb-4 text-muted-foreground">{usuario.email}</p>

                <h2 className="text-xl font-semibold mt-8 mb-4">Formularios Médicos</h2>

                {formulariosMedicos.length === 0 ? (
                    <p>No ha llenado ningún formulario médico.</p>
                ) : (
                    <ul className="space-y-2">
                        {formulariosMedicos.map((formulario) => (
                            <li key={formulario.id} className="flex items-center justify-between border p-2 rounded">
                                <span>Formulario #{formulario.id} - {new Date(formulario.created_at).toLocaleDateString()}</span>
                                <a
                                    href={`/pdf/ver/${formulario.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    Ver PDF
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </AppLayout>
    );
}

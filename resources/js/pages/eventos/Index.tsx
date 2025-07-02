import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fecha_evento: string;
  imagen_path?: string;
  video_url?: string;
}

interface Props {
  eventos: {
    data: Evento[];
    current_page: number;
    last_page: number;
    links: any[];
  };
}

export default function Index({ eventos }: Props) {
  const eliminarEvento = (id: number) => {
    if (!confirm('¿Deseas eliminar este evento?')) return;

    router.delete(route('eventos.destroy', id), {
      onSuccess: () => toast.success('Evento eliminado correctamente'),
      onError: () => toast.error('Ocurrió un error al eliminar'),
    });
  };

  return (
    <AppLayout>
      <Head title="Eventos" />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Eventos</h1>
          <Link href={route('eventos.create')}>
            <Button>Crear Evento</Button>
          </Link>
        </div>

        {eventos.data.length === 0 ? (
          <p className="text-gray-500">No hay eventos registrados aún.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventos.data.map((evento) => (
              <Card key={evento.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{evento.titulo}</CardTitle>
                  <p className="text-sm text-gray-500">{new Date(evento.fecha_evento).toLocaleDateString('es-CO')}</p>
                </CardHeader>
                <CardContent>
                  {evento.imagen_path && (
                    <img
                      src={evento.imagen_path}
                      alt={evento.titulo}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                  )}
                  {!evento.imagen_path && evento.video_url && (
                    <iframe
                      src={evento.video_url}
                      className="w-full h-40 rounded mb-3"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}

                  <p className="text-sm text-gray-700 mb-3">{evento.descripcion}</p>

                  <div className="flex gap-2">
                    <Link href={route('eventos.edit', evento.id)}>
                      <Button variant="outline">Editar</Button>
                    </Link>
                    <Button variant="destructive" onClick={() => eliminarEvento(evento.id)}>
                      Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

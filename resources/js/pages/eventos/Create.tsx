import { useForm } from '@inertiajs/react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm({
    titulo: '',
    descripcion: '',
    fecha_evento: '',
    video_url: '',
    imagen: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('eventos.store'), {
      onSuccess: () => {
        toast.success('Evento creado correctamente');
        reset();
        router.visit(route('eventos.index'));
      },
      onError: () => toast.error('Error al crear el evento'),
    });
  };

  return (
    <AppLayout>
      <Head title="Crear Evento" />

      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Crear Nuevo Evento</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Título */}
          <div>
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              value={data.titulo}
              onChange={(e) => setData('titulo', e.target.value)}
            />
            {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo}</p>}
          </div>

          {/* Descripción */}
          <div>
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={data.descripcion}
              onChange={(e) => setData('descripcion', e.target.value)}
            />
            {errors.descripcion && <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>}
          </div>

          {/* Fecha */}
          <div>
            <Label htmlFor="fecha_evento">Fecha del Evento</Label>
            <Input
              id="fecha_evento"
              type="date"
              value={data.fecha_evento}
              onChange={(e) => setData('fecha_evento', e.target.value)}
            />
            {errors.fecha_evento && <p className="text-red-500 text-sm mt-1">{errors.fecha_evento}</p>}
          </div>

          {/* Imagen */}
          <div>
            <Label htmlFor="imagen">Imagen (opcional)</Label>
            <Input
              id="imagen"
              type="file"
              accept="image/*"
              onChange={(e) => setData('imagen', e.target.files?.[0] ?? null)}
            />
            {errors.imagen && <p className="text-red-500 text-sm mt-1">{errors.imagen}</p>}
          </div>

          {/* Video */}
          <div>
            <Label htmlFor="video_url">Enlace de Video (opcional)</Label>
            <Input
              id="video_url"
              type="url"
              value={data.video_url}
              onChange={(e) => setData('video_url', e.target.value)}
              placeholder="https://www.youtube.com/embed/..."
            />
            {errors.video_url && <p className="text-red-500 text-sm mt-1">{errors.video_url}</p>}
          </div>

          {/* Botón */}
          <div className="flex justify-end">
            <Button type="submit" disabled={processing}>
              Guardar Evento
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

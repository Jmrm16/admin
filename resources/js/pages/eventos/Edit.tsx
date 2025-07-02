import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import InputError from '@/components/input-error';

interface Props {
  evento: {
    id: number;
    titulo: string;
    descripcion: string;
    fecha_evento: string;
    video_url?: string;
    imagen_path?: string;
  };
}

export default function Edit({ evento }: Props) {
  const { data, setData, put,post, processing, errors } = useForm({
    titulo: evento.titulo || '',
    descripcion: evento.descripcion || '',
    fecha_evento: evento.fecha_evento || '',
    video_url: evento.video_url || '',
    imagen: null as File | null,
  });

const handleSubmit: FormEventHandler = (e) => {
  e.preventDefault();
  console.log('DATA A ENVIAR', data); // 👈

post(route('eventos.update', evento.id), {
  method: 'put', // 👈 override explícito
  forceFormData: true,
});

};


  return (
    <AppLayout>
      <Head title={`Editar: ${evento.titulo}`} />

      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Editar Evento</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Título */}
          <div>
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              value={data.titulo}
              onChange={(e) => setData('titulo', e.target.value)}
            />
            <InputError message={errors.titulo} />
          </div>

          {/* Descripción */}
          <div>
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={data.descripcion}
              onChange={(e) => setData('descripcion', e.target.value)}
            />
            <InputError message={errors.descripcion} />
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
            <InputError message={errors.fecha_evento} />
          </div>

          {/* Video */}
          <div>
            <Label htmlFor="video_url">Enlace de Video</Label>
            <Input
              id="video_url"
              type="url"
              value={data.video_url}
              onChange={(e) => setData('video_url', e.target.value)}
            />
            <InputError message={errors.video_url} />
          </div>

          {/* Imagen nueva */}
          <div>
            <Label htmlFor="imagen">Cambiar imagen (opcional)</Label>
            <Input
              id="imagen"
              type="file"
              accept="image/*"
              onChange={(e) => setData('imagen', e.target.files?.[0] ?? null)}
            />
            <InputError message={errors.imagen} />
          </div>

          {/* Imagen actual */}
          {evento.imagen_path && (
            <div>
              <p className="text-sm text-gray-600 mb-1">Imagen actual:</p>
              <img src={evento.imagen_path} alt="Imagen actual" className="w-full max-h-48 object-cover rounded" />
            </div>
          )}

          {/* Botón */}
          <div className="flex justify-end">
            <Button type="submit" disabled={processing}>
              Guardar Cambios
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

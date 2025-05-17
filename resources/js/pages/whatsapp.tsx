import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import axios from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Whatsapp',
    href: '/whatsapp',
  },
];

export default function WhatsappDashboard() {
  const [loading, setLoading] = useState(false);

  const enviarMensajePrueba = async () => {
    setLoading(true);
    try {
      await axios.get('/whatsapp/enviar');
      toast.success('Mensaje de prueba enviado con éxito');
    } catch (error) {
      toast.error('Error al enviar mensaje');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Whatsapp Chatbot" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">WhatsApp Chatbot</h1>
        <p className="text-muted-foreground">
          Este panel permite enviar un mensaje de prueba al número configurado en el controlador.
        </p>

        <Button onClick={enviarMensajePrueba} disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar mensaje de prueba'}
        </Button>
      </div>
    </AppLayout>
  );
}

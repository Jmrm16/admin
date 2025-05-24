import { useEffect, useState, useRef } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SendHorizonal, UserCircle } from 'lucide-react';
import axios from 'axios';

interface Cliente {
  id: number;
  nombre: string | null;
  numero: string;
}

interface Mensaje {
  id: number;
  contenido: string;
  tipo: 'enviado' | 'recibido';
  autor?: {
    name: string;
  };
  created_at: string;
}

interface Props {
  clientes: Cliente[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Whatsapp',
    href: '/whatsapp',
  },
];

export default function Chatbox({ clientes }: Props) {
  const [activo, setActivo] = useState<Cliente | null>(clientes[0] || null);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [contenido, setContenido] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activo) {
      axios.get(`/whatsapp/clientes/${activo.id}/mensajes`).then((res) => {
        setMensajes(res.data);
        scrollToBottom();
      });
    }
  }, [activo]);

  const scrollToBottom = () => {
    setTimeout(() => {
      chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contenido.trim() || !activo) return;

    await axios.post('/whatsapp/enviar', {
      whatsapp_cliente_id: activo.id,
      contenido,
    });

    setContenido('');
    const res = await axios.get(`/whatsapp/clientes/${activo.id}/mensajes`);
    setMensajes(res.data);
    scrollToBottom();
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="CRM WhatsApp" />
      <div className="flex h-[calc(100vh-80px)] rounded-xl overflow-hidden border shadow bg-background">
        {/* Sidebar clientes */}
        <div className="w-1/4 bg-background border-r flex flex-col">
          <div className="p-4 text-lg font-semibold border-b">
            Contactos
          </div>
          <ScrollArea className="flex-1">
            {clientes.map((cliente) => (
              <div
                key={cliente.id}
                onClick={() => setActivo(cliente)}
                className={`flex items-center gap-3 cursor-pointer px-4 py-3 border-b hover:bg-muted transition ${
                  activo?.id === cliente.id ? 'bg-muted' : ''
                }`}
              >
                <UserCircle className="h-8 w-8 text-muted-foreground" />
                <div>
                  <div className="font-semibold">
                    {cliente.nombre || cliente.numero}
                  </div>
                  <div className="text-sm text-muted-foreground">{cliente.numero}</div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat panel */}
        <div className="flex-1 flex flex-col bg-background">
          {/* Header superior */}
          <div className="p-4 border-b flex items-center gap-3">
            <UserCircle className="h-8 w-8" />
            <div>
              <div className="font-semibold">
                {activo?.nombre || activo?.numero || 'Selecciona un contacto'}
              </div>
              <div className="text-sm text-muted-foreground">{activo ? 'En línea' : ''}</div>
            </div>
          </div>

          {/* Mensajes */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-2">
            {activo ? (
              mensajes.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.tipo === 'enviado' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-md border text-sm ${
                      m.tipo === 'enviado'
                        ? 'bg-muted text-foreground'
                        : 'bg-background text-foreground'
                    }`}
                  >
                    {m.contenido}
                    <div className="text-[10px] mt-1 text-right text-muted-foreground">
                      {new Date(m.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground mt-10">
                Selecciona un contacto para comenzar
              </p>
            )}
          </div>

          {/* Input */}
          {activo && (
            <form onSubmit={enviar} className="p-4 border-t bg-background flex items-center gap-2">
              <Input
                className="flex-1"
                placeholder="Escribe un mensaje..."
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
              />
              <Button type="submit" className="px-3 h-10">
                <SendHorizonal className="h-5 w-5" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

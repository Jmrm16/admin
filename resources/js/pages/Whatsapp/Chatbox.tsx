import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Head } from '@inertiajs/react';

interface Cliente {
  id: number;
  nombre: string;
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

export default function Chatbox({ clientes }: Props) {
  const [activo, setActivo] = useState<Cliente | null>(clientes[0] || null);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [contenido, setContenido] = useState("");
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

    await axios.post("/whatsapp/enviar", {
      whatsapp_cliente_id: activo.id,
      contenido,
    });

    setContenido("");
    const res = await axios.get(`/whatsapp/clientes/${activo.id}/mensajes`);
    setMensajes(res.data);
    scrollToBottom();
  };

  return (
    <>
      <Head title="CRM WhatsApp" />
      <div className="flex h-screen">
        {/* Lista de clientes */}
        <aside className="w-1/4 bg-[#f0f2f5] border-r overflow-y-auto">
          {clientes.map((cliente) => (
            <div
              key={cliente.id}
              onClick={() => setActivo(cliente)}
              className={`cursor-pointer px-4 py-3 border-b hover:bg-[#e9ebee] transition ${activo?.id === cliente.id ? 'bg-[#d9dbdd]' : ''}`}
            >
              <div className="font-semibold text-gray-800">{cliente.nombre}</div>
              <div className="text-sm text-gray-500">{cliente.numero}</div>
            </div>
          ))}
        </aside>

        {/* Panel de chat */}
        <main className="flex-1 flex flex-col bg-[#ece5dd]">
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4">
            {activo ? (
              mensajes.map((m, i) => (
                <div key={i} className={`mb-2 flex ${m.tipo === 'enviado' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-xl shadow text-sm whitespace-pre-wrap ${m.tipo === 'enviado' ? 'bg-[#dcf8c6] text-gray-900' : 'bg-white text-gray-800'}`}>
                    {m.contenido}
                    <div className="text-[10px] mt-1 text-right text-gray-500">{new Date(m.created_at).toLocaleTimeString()}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-10">Selecciona un contacto para comenzar</p>
            )}
          </div>

          {/* Input */}
          {activo && (
            <form onSubmit={enviar} className="flex items-center p-4 bg-[#f0f2f5] border-t">
              <input
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Escribe un mensaje..."
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
              />
              <button className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full">
                Enviar
              </button>
            </form>
          )}
        </main>
      </div>
    </>
  );
}

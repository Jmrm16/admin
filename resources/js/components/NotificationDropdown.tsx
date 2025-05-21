import { useEffect, useState } from "react";
import axios from "axios";
import { router } from "@inertiajs/react";
import { BellIcon, CheckIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Notificacion = {
  id: number;
  mensaje: string;
  leida: boolean;
  created_at: string;
  data?: {
    user_id?: number;
    formulario_id?: number;
    tipo_proceso?: string;
  };
};

export function NotificationDropdown() {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);

  const fetchNotificaciones = async () => {
    try {
      const res = await axios.get("/api/notificaciones/no-leidas");
      setNotificaciones(res.data);
    } catch (error) {
      console.error("❌ Error al obtener notificaciones:", error);
    }
  };

  const marcarComoLeidas = async () => {
    try {
      await axios.post("/api/notificaciones/marcar-leidas");
      setNotificaciones([]);
    } catch (error) {
      console.error("❌ Error al marcar todas como leídas:", error);
    }
  };

  const handleClickNotificacion = async (notificacion: Notificacion) => {
    try {
      await axios.post(`/api/notificaciones/${notificacion.id}/leer`);

      if (notificacion.data?.user_id) {
        router.get(`/usuarios/${notificacion.data.user_id}`);
      } else if (notificacion.data?.user_id) {
        
      }
    } catch (error) {
      console.error("❌ Error al marcar como leída o redirigir:", error);
    }
  };

  useEffect(() => {
    fetchNotificaciones();
    const intervalo = setInterval(fetchNotificaciones, 10000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <BellIcon className="h-5 w-5" />
          {notificaciones.length > 0 && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 max-h-96 overflow-auto">
        {notificaciones.length === 0 ? (
          <DropdownMenuItem disabled>
            No hay notificaciones nuevas
          </DropdownMenuItem>
        ) : (
          <>
            {notificaciones.map((n) => (
              <DropdownMenuItem
                key={n.id}
                className="py-3 px-4 hover:bg-muted/50 cursor-pointer rounded-md flex flex-col gap-1"
                onClick={() => handleClickNotificacion(n)}
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">{n.mensaje}</p>
                  {n.data?.tipo_proceso && (
                    <Badge variant="outline" className="text-xs">
                      {n.data.tipo_proceso}
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(n.created_at).toLocaleString()}
                </span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem className="text-center justify-center">
              <Button
                variant="secondary"
                size="sm"
                className="w-full mt-2 flex items-center gap-1"
                onClick={marcarComoLeidas}
              >
                <CheckIcon className="h-4 w-4" />
                Marcar todas como leídas
              </Button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

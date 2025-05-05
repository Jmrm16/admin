import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Formulario {
  id: number;
  fecha: string;
  tipo_solicitud: string;
  estado: string;
  pdf_path: string;
  created_at: string;
  sucursal: string;
}

interface Props {
  usuario: {
    id: number;
    name: string;
    email: string;
  };
  formularios: Formulario[];
}

export default function Profile({ usuario, formularios: initialFormularios }: Props) {
  const [formularios, setFormularios] = useState<Formulario[]>(initialFormularios);

  const handleChangeEstado = (formularioId: number, nuevoEstado: string) => {
    axios
      .post(`/formularios-medicos/${formularioId}/estado`, { estado: nuevoEstado })
      .then(() => {
        // Actualizar estado localmente
        const actualizados = formularios.map((f) =>
          f.id === formularioId ? { ...f, estado: nuevoEstado } : f
        );
        setFormularios(actualizados);
        toast.success('Estado actualizado correctamente.');
      })
      .catch((error) => {
        console.error('Error al cambiar el estado:', error);
        toast.error('Error al actualizar el estado.');
      });
  };

  return (
    <AppLayout>
      <Head title={`Perfil de ${usuario.name}`} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
      
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Información del Usuario</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nombre</p>
              <p className="text-sm">{usuario.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-sm">{usuario.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Formularios</p>
              <p className="text-sm">{formularios.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Formularios Médicos</CardTitle>
            <p className="text-sm text-muted-foreground">
              Listado de formularios registrados por {usuario.name}
            </p>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Fecha de Creación</TableHead>
                    <TableHead>Proceso</TableHead>
                    <TableHead>Tipo de Solicitud</TableHead>                    
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formularios.map((formulario) => (
                    <TableRow key={formulario.id}>
                      <TableCell className="font-medium">{formulario.id}</TableCell>
                      <TableCell>
                        {new Date(formulario.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{formulario.tipo_solicitud}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{formulario.tipo_solicitud}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{formulario.estado}</Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Select
                          value={formulario.estado}
                          onValueChange={(estado) =>
                            handleChangeEstado(formulario.id, estado)
                          }
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Cambiar Estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pendiente">Pendiente</SelectItem>
                            <SelectItem value="revisión">En Revisión</SelectItem>
                            <SelectItem value="proceso_pago">Aprobado</SelectItem>
                            <SelectItem value="constancia_pago">Rechazado</SelectItem>
                            <SelectItem value="poliza">poliza</SelectItem>
                            <SelectItem value="finalizado">Finalizado</SelectItem>
                            
                          </SelectContent>
                        </Select>
                        <Link href={`/formularios-medicos/${formulario.id}`} className="ml-2">
                          <Button size="sm" variant="outline">
                            Detalles
                          </Button>
                        </Link>
                        <Link href={`/formularios-medicos/${formulario.id}`} className="ml-2">
                        <Button size="sm" variant="outline">
                          asignar
                        </Button>
                      </Link>

                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

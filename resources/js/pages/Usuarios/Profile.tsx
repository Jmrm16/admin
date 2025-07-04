import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { ArrowLeft, User, Mail, FileText, Clock, Check, X, AlertTriangle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import { motion } from 'framer-motion';
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
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface Admin {
  id: number;
  name: string;
}

type Estado =
  | 'pendiente'
  | 'revision'
  | 'expedicion'
  | 'proceso_pago'
  | 'constancia_pago'
  | 'poliza'
  | 'finalizado';

interface Formulario {
  id: number;
  fecha: string;
  tipo_solicitud: string;
  estado: Estado;
  pdf_path: string;
  created_at: string;
  sucursal: string;
  tipo_proceso: string;
  admin_id?: number | null;
  admin?: Admin | null;
}

interface Props {
  usuario: {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
  };
  formularios: Formulario[];
  esAdmin: boolean;
}

const estadoColores = {
  pendiente: 'bg-gray-100 text-gray-800 border border-gray-200',
  revision: 'bg-blue-50 text-blue-800 border border-blue-100',
  expedicion: 'bg-purple-50 text-purple-800 border border-purple-100',
  proceso_pago: 'bg-amber-50 text-amber-800 border border-amber-100',
  constancia_pago: 'bg-orange-50 text-orange-800 border border-orange-100',
  poliza: 'bg-indigo-50 text-indigo-800 border border-indigo-100',
  finalizado: 'bg-green-50 text-green-800 border border-green-100',
};

const estadoIconos = {
  pendiente: <Clock className="h-4 w-4" />,
  revision: <AlertTriangle className="h-4 w-4" />,
  expedicion: <FileText className="h-4 w-4" />,
  proceso_pago: <FileText className="h-4 w-4" />,
  constancia_pago: <FileText className="h-4 w-4" />,
  poliza: <FileText className="h-4 w-4" />,
  finalizado: <Check className="h-4 w-4" />,
};

export default function Profile({ usuario, formularios: initialFormularios, esAdmin }: Props) {
  const [formularios, setFormularios] = useState<Formulario[]>(initialFormularios);

  const totalFormularios = formularios.length;
  const formulariosPendientes = formularios.filter(f => f.estado === 'pendiente').length;
  const porcentajeCompletados = totalFormularios > 0 
    ? Math.round((formularios.filter(f => f.estado === 'finalizado').length / totalFormularios) * 100)
    : 0;

  const handleChangeEstado = (formularioId: number, nuevoEstado: Estado) => {
    axios
      .post(`/formularios-medicos/${formularioId}/estado`, { estado: nuevoEstado })
      .then(() => {
        const actualizados = formularios.map((f) =>
          f.id === formularioId ? { ...f, estado: nuevoEstado } : f
        );
        setFormularios(actualizados);
        toast.success('Estado actualizado correctamente');
      })
      .catch((error) => {
        console.error('Error al cambiar el estado:', error);
        toast.error('Error al actualizar el estado');
      });
  };

  return (
    <AppLayout>
      <Head title={`Perfil de ${usuario.name}`} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6"
      >
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href={esAdmin ? '/usuarios/admins' : '/usuarios'}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al listado
            </Link>
          </Button>
          <Badge variant={usuario.role === 'admin' ? 'default' : 'secondary'}>
            {usuario.role === 'admin' ? 'Administrador' : 'Cliente'}
          </Badge>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader className="border-b">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`https://ui-avatars.com/api/?name=${usuario.name}&background=random`} />
                <AvatarFallback>{usuario.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-semibold">{usuario.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {usuario.email}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Miembro desde</h3>
              <p className="text-sm flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {new Date(usuario.created_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Formularios</h3>
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold">{totalFormularios}</div>
                {formulariosPendientes > 0 && (
                  <Badge variant="destructive" className="gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {formulariosPendientes} pendientes
                  </Badge>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Progreso</h3>
              <div className="space-y-1">
                <Progress value={porcentajeCompletados} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {porcentajeCompletados}% completados
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Formularios Médicos</CardTitle>
                <CardDescription>
                  Historial de formularios {esAdmin ? 'asignados' : 'registrados'}
                </CardDescription>
              </div>
              <Badge variant="outline" className="px-3 py-1 text-sm">
                Total: {formularios.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <Table>
<TableHeader>
  <TableRow className="bg-gray-100 dark:bg-gray-900">
    <TableHead className="text-gray-800 dark:text-gray-300">ID</TableHead>
    <TableHead className="text-gray-800 dark:text-gray-300">Fecha</TableHead>
    <TableHead className="text-gray-800 dark:text-gray-300">Proceso</TableHead>
    <TableHead className="text-gray-800 dark:text-gray-300">Solicitud</TableHead>
    <TableHead className="text-gray-800 dark:text-gray-300">Estado</TableHead>
    <TableHead className="text-gray-800 dark:text-gray-300">Asignado a</TableHead>
    <TableHead className="text-right text-gray-800 dark:text-gray-300">Acciones</TableHead>
  </TableRow>
</TableHeader>


<TableBody>
  {formularios.map((formulario) => {
    const sinAsignar = !formulario.admin_id;

    return (
      <TableRow
  key={formulario.id}
  className={`transition-all
    ${!formulario.admin_id
      ? 'bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-400 dark:border-yellow-300'
      : 'bg-white dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
    }
  `}
>
        <TableCell className="font-medium text-black/90 dark:text-white/90">
          #{formulario.id}
        </TableCell>

        <TableCell className="text-black/70 dark:text-white/70">
          {new Date(formulario.created_at).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })}
        </TableCell>

        <TableCell>
          <Badge variant="outline" className="capitalize border border-gray-400/40 text-black/90 dark:text-white/90">
            {formulario.tipo_proceso}
          </Badge>
        </TableCell>

        <TableCell>
          <Badge variant="secondary" className="capitalize text-black/80 dark:text-white/80 bg-white/10 dark:bg-white/10">
            {formulario.tipo_solicitud}
          </Badge>
        </TableCell>

<TableCell>
  <Tooltip>
    <TooltipTrigger>
      <Badge 
        className={`capitalize ${estadoColores[formulario.estado]} px-2 py-1 text-xs font-medium rounded-md`}
      >
        <span className="flex items-center gap-1">
          {estadoIconos[formulario.estado]}
          {formulario.estado.replace(/_/g, ' ')}
        </span>
      </Badge>
    </TooltipTrigger>
    <TooltipContent className="bg-gray-800 text-white border border-gray-600 shadow-md">
      <p>Estado actual del formulario</p>
    </TooltipContent>
  </Tooltip>
</TableCell>


        <TableCell>
          {formulario.admin ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={`https://ui-avatars.com/api/?name=${formulario.admin.name}&background=random`} />
                <AvatarFallback>{formulario.admin.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-black/80 dark:text-white/80">{formulario.admin.name}</span>
            </div>
          ) : (
            <Badge
              variant="outline"
              className="bg-yellow-100/20 dark:bg-yellow-300/10 text-yellow-700 dark:text-yellow-300 border border-yellow-400/30 dark:border-yellow-200/20"
            >
              Sin asignar
            </Badge>
          )}
        </TableCell>

        <TableCell className="text-right space-x-2">
          <Link href={`/formularios-medicos/${formulario.id}`}>
            <Button size="sm" variant="outline" className="text-black border-gray-400 dark:text-white dark:border-white/30">
              Ver
            </Button>
          </Link>
        </TableCell>
      </TableRow>
    );
  })}
</TableBody>

              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AppLayout>
  );
}
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

interface Formulario {
  id: number;
  tipo_solicitud: string;
  tipo_proceso: string;
  estado: string;
  created_at: string;
}

interface Props {
  admin: {
    id: number;
    name: string;
    email: string;
  };
  formularios: Formulario[];
  emitidas: number;
  asignadas: number;
}

export default function AdminProfile({ admin, formularios, emitidas, asignadas }: Props) {
  return (
    <AppLayout>
      <Head title={`Perfil de Admin ${admin.name}`} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 p-4"
      >
        <div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/usuarios">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a listado de usuarios
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Información del Administrador</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nombre</p>
              <p className="text-sm">{admin.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-sm">{admin.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total de pólizas asignadas</p>
              <p className="text-sm">{asignadas}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pólizas emitidas</p>
              <p className="text-sm">{emitidas}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Pólizas Asignadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Proceso</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formularios.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell className="font-medium">{f.id}</TableCell>
                      <TableCell>{new Date(f.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{f.tipo_solicitud}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{f.tipo_proceso}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{f.estado}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AppLayout>
  );
}

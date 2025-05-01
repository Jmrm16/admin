import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, DownloadIcon } from 'lucide-react';

interface Formulario {
  id: number;
  fecha: string;
  sucursal: string;
  tipo_solicitud: string;
  pdf_path: string;
  created_at: string;
}

interface Props {
  usuario: {
    id: number;
    name: string;
    email: string;
  };
  formularios: Formulario[];
}

export default function Profile({ usuario, formularios }: Props) {
  return (
    <AppLayout>
      <Head title={`Perfil de ${usuario.name}`} />

      <div className="container mx-auto py-6">
        {/* Sección de información del usuario */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Información del Usuario</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Nombre</p>
              <p className="text-sm">{usuario.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-sm">{usuario.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Formularios</p>
              <p className="text-sm">{formularios.length}</p>
            </div>
          </CardContent>
        </Card>

        {/* Sección de formularios con diseño tabular */}
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
                    <TableHead>Sucursal</TableHead>
                    <TableHead>Tipo de Solicitud</TableHead>
                    <TableHead>Fecha de Creación</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formularios.map((formulario) => (
                    <TableRow key={formulario.id}>
                      <TableCell className="font-medium">
                        {formulario.id}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{formulario.sucursal}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {formulario.tipo_solicitud}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(formulario.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/formularios-medicos/${formulario.id}`}>
                                Ver Detalle
                              </Link>
                            </DropdownMenuItem>
                            {formulario.pdf_path && (
                              <DropdownMenuItem asChild>
                                <a 
                                  href={formulario.pdf_path} 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full"
                                >
                                  <DownloadIcon className="mr-2 h-4 w-4" />
                                  Descargar PDF
                                </a>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
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
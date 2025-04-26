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
} from '@/components/ui/table'; // Adjusted path to match the correct location of the table component
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, Search } from 'lucide-react';

interface Formulario {
  id: number;
  fecha: string;
  sucursal: string;
  tipo_solicitud: string;
  user: {
    name: string;
    email: string;
  };
}

interface Props {
  formularios: Formulario[];
}

export default function FormulariosIndex({ formularios }: Props) {
  return (
    <AppLayout>
      <Head title="Formularios Médicos" />

      <div className="container mx-auto py-6">
        <Card>
          <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">Formularios Médicos</CardTitle>
              <p className="text-sm text-muted-foreground">
                Listado completo de formularios médicos registrados
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar formularios..."
                  className="pl-10 w-full"
                />
              </div>
              <Button asChild className="w-full sm:w-auto">
                <Link href="/formularios-medicos/create">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nuevo Formulario
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Sucursal</TableHead>
                    <TableHead>Tipo de Solicitud</TableHead>
                    <TableHead>Fecha</TableHead>
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
                        <div className="font-medium">
                          {formulario.user?.name ?? 'N/A'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formulario.user?.email ?? ''}
                        </div>
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
                        {formulario.fecha
                          ? new Date(formulario.fecha).toLocaleDateString()
                          : ''}
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
                              <Link
                                href={`/formularios-medicos/${formulario.id}`}
                              >
                                Ver Detalle
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/formularios-medicos/${formulario.id}/edit`}
                              >
                                Editar
                              </Link>
                            </DropdownMenuItem>
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
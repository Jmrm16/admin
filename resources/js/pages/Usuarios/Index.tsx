import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlusCircle, Search, MoreHorizontal } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Usuarios',
    href: '/usuarios',
  },
];

interface UsuariosIndexProps {
  usuarios: {
    id: number;
    name: string;
    email: string;
  }[];
}

export default function UsuariosIndex({ usuarios }: UsuariosIndexProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Usuarios" />

      <div className="container mx-auto py-6">
        <Card>
          <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">Lista de Usuarios</CardTitle>
              <p className="text-sm text-muted-foreground">
                Administra los usuarios registrados en el sistema
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar usuarios..."
                  className="pl-10 w-full"
                />
              </div>
              <Button asChild className="w-full sm:w-auto">
                <Link href="/usuarios/create">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Agregar Usuario
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
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuarios.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell className="font-medium">
                        {usuario.id}
                      </TableCell>
                      <TableCell>{usuario.name}</TableCell>
                      <TableCell>{usuario.email}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menú</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
  <DropdownMenuItem asChild>
    <Link href={`/usuarios/${usuario.id}`}>Ver Perfil</Link>
  </DropdownMenuItem>
  <DropdownMenuItem asChild>
    <Link href={`/usuarios/${usuario.id}/edit`}>
      Editar
    </Link>
  </DropdownMenuItem>
  <DropdownMenuItem asChild>
    <Link
      href={`/usuarios/${usuario.id}`}
      method="delete"
      as="button"
      className="w-full text-left text-destructive"
    >
      Eliminar
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
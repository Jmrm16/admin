import { useState, useEffect } from 'react';
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
import { Search } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Clientes', href: '/usuarios' },
];

interface UsuariosIndexProps {
  usuarios: {
    id: number;
    name: string;
    email: string;
    created_at: string;
  }[];
}

const USUARIOS_POR_PAGINA = 10;

export default function UsuariosIndex({ usuarios }: UsuariosIndexProps) {
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);

  // Filtrar usuarios por búsqueda
  const usuariosFiltrados = busqueda.trim()
    ? usuarios.filter(
        (usuario) =>
          usuario?.name?.toLowerCase().includes(busqueda.toLowerCase()) ||
          usuario?.email?.toLowerCase().includes(busqueda.toLowerCase())
      )
    : usuarios;

  // Calcular paginación frontend
  const totalUsuarios = usuariosFiltrados.length;
  const totalPaginas = Math.ceil(totalUsuarios / USUARIOS_POR_PAGINA);

  // Obtener usuarios para la página actual
  const usuariosPagina = usuariosFiltrados.slice(
    (paginaActual - 1) * USUARIOS_POR_PAGINA,
    paginaActual * USUARIOS_POR_PAGINA
  );

  // Resetear página a 1 cuando cambia la búsqueda
  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Gestión de Clientes" />

      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <div className="border-none shadow-sm">
          <Card className="h-full">
            <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6">
              <div>
                <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Gestión de Clientes
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {totalUsuarios} clientes registrados en el sistema
                </p>
              </div>
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o email..."
                  className="pl-10 w-full"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="rounded-lg border">
                <Table className="min-w-full">
                  <TableHeader className="bg-gray-50 dark:bg-gray-800">
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Fecha Registro</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usuariosPagina.length > 0 ? (
                      usuariosPagina.map((usuario) => (
                        <TableRow
                          key={usuario.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        >
                          <TableCell className="font-medium text-gray-900 dark:text-white">
                            {usuario.id}
                          </TableCell>
                          <TableCell className="font-medium">
                            {usuario.name}
                          </TableCell>
                          <TableCell>{usuario.email}</TableCell>
                          <TableCell>{formatDate(usuario.created_at)}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Link href={`/usuarios/${usuario.id}`}>
                              <Button size="sm" variant="outline">
                                Detalles
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center py-8 text-muted-foreground"
                        >
                          {busqueda
                            ? 'No se encontraron usuarios con ese criterio de búsqueda'
                            : 'No hay usuarios registrados'}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Paginación frontend */}
              {totalPaginas > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Mostrando{' '}
                    <span className="font-medium">
                      {(paginaActual - 1) * USUARIOS_POR_PAGINA + 1}
                    </span>{' '}
                    a{' '}
                    <span className="font-medium">
                      {Math.min(
                        paginaActual * USUARIOS_POR_PAGINA,
                        totalUsuarios
                      )}
                    </span>{' '}
                    de <span className="font-medium">{totalUsuarios}</span>{' '}
                    clientes
                  </div>
                  <div className="flex gap-2 items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={paginaActual === 1}
                      onClick={() => setPaginaActual((prev) => prev - 1)}
                    >
                      Anterior
                    </Button>
                    {[...Array(totalPaginas)].map((_, idx) => (
                      <Button
                        key={idx}
                        variant={paginaActual === idx + 1 ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPaginaActual(idx + 1)}
                      >
                        {idx + 1}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={paginaActual === totalPaginas}
                      onClick={() => setPaginaActual((prev) => prev + 1)}
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

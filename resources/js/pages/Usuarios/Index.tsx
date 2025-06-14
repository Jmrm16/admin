import { useState } from 'react';
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
import { PlusCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Clientes',
    href: '/usuarios',
  },
];

interface UsuariosIndexProps {
  usuarios: {
    id: number;
    name: string;
    email: string;
    created_at: string;
  }[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
  };
}

const MotionCard = motion(Card);
const MotionCardHeader = motion(CardHeader);
const MotionCardContent = motion(CardContent);
const MotionTableRow = motion(TableRow);

export default function UsuariosIndex({ usuarios, pagination }: UsuariosIndexProps) {
  const [busqueda, setBusqueda] = useState('');

  const usuariosFiltrados = usuarios.filter(
    (usuario) =>
      usuario.name.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.email.toLowerCase().includes(busqueda.toLowerCase())
  );

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

      <motion.div
        className="flex h-full flex-1 flex-col gap-4 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <MotionCard
          className="border-none shadow-sm"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <MotionCardHeader
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
                Gestión de Clientes
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {pagination.total} clientes registrados en el sistema
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o email..."
                  className="pl-10 w-full"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
              <Link href="/usuarios/create">
                <Button className="w-full sm:w-auto">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nuevo Cliente
                </Button>
              </Link>
            </div>
          </MotionCardHeader>

          <MotionCardContent
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
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
                  {usuariosFiltrados.length > 0 ? (
                    usuariosFiltrados.map((usuario) => (
                      <MotionTableRow
                        key={usuario.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * usuario.id }}
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
                      </MotionTableRow>
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

            {/* Paginación */}
            {pagination.last_page > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Mostrando{' '}
                  <span className="font-medium">
                    {(pagination.current_page - 1) * pagination.per_page + 1}
                  </span>{' '}
                  a{' '}
                  <span className="font-medium">
                    {Math.min(
                      pagination.current_page * pagination.per_page,
                      pagination.total
                    )}
                  </span>{' '}
                  de <span className="font-medium">{pagination.total}</span>{' '}
                  clientes
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href={
                          pagination.links[0].url
                            ? pagination.links[0].url
                            : '#'
                        }
                        isActive={pagination.current_page === 1}
                      />
                    </PaginationItem>

                    {pagination.links.slice(1, -1).map((link, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          href={link.url || '#'}
                          isActive={link.active}
                        >
                          {link.label}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                       href={pagination.links[pagination.links.length - 1].url ?? '#'}
                        isActive={
                          pagination.current_page === pagination.last_page
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </MotionCardContent>
        </MotionCard>
      </motion.div>
    </AppLayout>
  );
}
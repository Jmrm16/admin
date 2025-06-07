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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlusCircle, Search, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const breadcrumbs: BreadcrumbItem[] = [
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
  }[];
}

const MotionCard = motion(Card);
const MotionCardHeader = motion(CardHeader);
const MotionCardContent = motion(CardContent);
const MotionTableRow = motion(TableRow);

export default function UsuariosIndex({ usuarios }: UsuariosIndexProps) {
  const [busqueda, setBusqueda] = useState('');

  const usuariosFiltrados = usuarios.filter(
    (usuario) =>
      usuario.name.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Usuarios" />

      <motion.div
        className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <MotionCard
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <MotionCardHeader
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <CardTitle className="text-2xl">Lista de Clientes</CardTitle>
              <p className="text-sm text-muted-foreground">
                Administra los Clientes registrados en el sistema
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar usuarios..."
                  className="pl-10 w-full"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
             
            </div>
          </MotionCardHeader>
          <MotionCardContent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
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
                  {usuariosFiltrados.length > 0 ? (
                    usuariosFiltrados.map((usuario) => (
                      <MotionTableRow
                        key={usuario.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * usuario.id }}
                      >
                        <TableCell className="font-medium">
                          {usuario.id}
                        </TableCell>
                        <TableCell>{usuario.name}</TableCell>
                        <TableCell>{usuario.email}</TableCell>
                        <TableCell className="text-right">
                          <Link href={`/usuarios/${usuario.id}`}>
                            <Button size="sm" variant="outline">
                              Ver Perfil
                            </Button>
                          </Link>
                   
                        </TableCell>
                      </MotionTableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No se encontraron usuarios.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </MotionCardContent>
        </MotionCard>
      </motion.div>
    </AppLayout>
  );
}

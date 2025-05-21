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


const MotionCard = motion(Card);
const MotionCardHeader = motion(CardHeader);
const MotionCardContent = motion(CardContent);
const MotionTableRow = motion(TableRow);

export default function UsuariosIndex({ usuarios }: UsuariosIndexProps) {
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
                  {usuarios.map((usuario) => (
                    <MotionTableRow
                      key={usuario.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * usuario.id }}
                    >
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
                              <Link href={`/usuarios/${usuario.id}`}>
                                Ver Perfil
                              </Link>
                            </DropdownMenuItem>
                           
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </MotionTableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </MotionCardContent>
        </MotionCard>
      </motion.div>
    </AppLayout>
  );
}
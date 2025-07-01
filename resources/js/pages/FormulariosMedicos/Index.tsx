import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';

interface User {
  name: string;
  email: string;
  // otros campos que tenga el user
}

interface Admin {
  name: string;
}

interface Formulario {
  id: number;
  estado: string;
  user?: User;    // 👈 Relación user
  admin?: Admin;  // 👈 Relación admin
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Mis Formularios',
    href: '/formularios-medicos',
  },
];

export default function FormulariosIndex({ formularios }: { formularios: any }) {
  // Asegúrate de que data tiene user
  const formulariosData = Array.isArray(formularios?.data)
    ? formularios.data.filter((f: any) => f.id != null)
    : [];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Mis Formularios" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className=" relative flex-1 overflow-hidden rounded-xl border p-4">
          <div className="relative z-10">
            <h1 className="text-2xl font-bold mb-4">Listado de Formularios Asignados</h1>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre del Cliente</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Administrador</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formulariosData.map((formulario: Formulario) => (
                  <TableRow key={formulario.id}>
                    <TableCell>
                      {formulario.user?.name || 'Sin usuario'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={formulario.estado === 'finalizado' ? 'default' : 'secondary'}>
                        {formulario.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {formulario.admin?.name || 'No disponible'}
                    </TableCell>
                    <TableCell>
                      <Link href={`/formularios-medicos/${formulario.id}`}>
                        <Button variant="outline" size="sm">Ver detalles</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {formularios.links && (
              <div className="mt-4 flex justify-center space-x-2">
                {formularios.links.map((link: any) => (
                  <Link
                    key={link.url ?? link.label}
                    href={link.url ?? '#'}
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ))}
              </div>
            )}
          </div>
          <PlaceholderPattern className="absolute inset-0 size-full " />
        </div>
      </div>
    </AppLayout>
  );
}

import { useForm, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function CreateUser() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'cliente',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/usuarios');
  };

  return (
    <AppLayout>
      <Head title="Crear Usuario" />

      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">Crear Usuario</CardTitle>
              <p className="text-sm text-muted-foreground">Formulario para registrar un nuevo usuario</p>
            </div>
            <Link href="/usuarios" className="text-sm text-blue-500 hover:underline flex items-center gap-1">
              <ArrowLeft size={16} /> Volver
            </Link>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-800 dark:text-white"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-800 dark:text-white"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-800 dark:text-white"
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <div>
                <Label htmlFor="password_confirmation">Confirmar Contraseña</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <Label htmlFor="role">Rol</Label>
                <select
                  id="role"
                  value={data.role}
                  onChange={(e) => setData('role', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-800 dark:text-white"
                >
                  <option value="cliente">Cliente</option>
                  <option value="admin">Administrador</option>
                </select>
                {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={processing}>
                  Crear Usuario
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

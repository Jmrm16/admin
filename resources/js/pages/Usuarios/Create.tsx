import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';

interface CreateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function Create({ open, onOpenChange }: CreateProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'cliente',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/usuarios', {
      onSuccess: () => {
        reset();
        onOpenChange(false); // cerrar modal
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Crear Usuario</DialogTitle>
          <DialogDescription>
            Llena la información para registrar un nuevo usuario.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
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

          <DialogFooter className="pt-4">
            <Button type="submit" disabled={processing}>
              Crear Usuario
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

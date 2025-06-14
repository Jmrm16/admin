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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

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
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            Crear Nuevo Usuario
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Complete todos los campos para registrar un nuevo usuario en el sistema.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Nombre Completo
            </Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="focus-visible:ring-2 focus-visible:ring-primary"
              placeholder="Ej: Juan Pérez"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Correo Electrónico
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="focus-visible:ring-2 focus-visible:ring-primary"
              placeholder="Ej: usuario@ejemplo.com"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                className="focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirmar Contraseña
              </Label>
              <Input
                id="password_confirmation"
                type="password"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                className="focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Rol del Usuario
            </Label>
            <Select
              value={data.role}
              onValueChange={(value) => setData('role', value)}
            >
              <SelectTrigger className="w-full focus:ring-2 focus:ring-primary">
                <SelectValue placeholder="Seleccione un rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cliente">Cliente</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-sm text-red-500 mt-1">{errors.role}</p>}
          </div>

          <DialogFooter className="pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
              className="mr-2"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={processing}
              className="bg-primary hover:bg-primary-dark"
            >
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                'Crear Usuario'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  open: boolean;
  onClose: () => void;
  userId: number;
  formularioId?: number;
  onUploadSuccess?: () => void;
}

const tiposPermitidos = [
  'cedula',
  'rut',
  'diploma',
  'tarjeta_profesional',
  'formulario_sarlaft',
  'formulario_medico',
  'formulario_oficio',
];

const tiposConFormulario = ['formulario_sarlaft', 'formulario_medico', 'formulario_oficio'];

const SubirDocumentoAdminModal: React.FC<Props> = ({
  open,
  onClose,
  userId,
  formularioId,
  onUploadSuccess,
}) => {
  const [tipo, setTipo] = useState<string>('');
  const [archivo, setArchivo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!tipo || !archivo) {
      toast.error('Por favor selecciona un tipo y un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('tipo', tipo);
    formData.append('archivo', archivo);

    // Solo agregar el ID si aplica
    if (tiposConFormulario.includes(tipo) && formularioId) {
      formData.append('formulario_medico_id', String(formularioId));
    }

    setLoading(true);
    try {
      await axios.post(`/documentos/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Documento subido correctamente');
      onClose();
      onUploadSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error('Error al subir el documento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subir nuevo documento</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Tipo de documento</Label>
            <Select value={tipo} onValueChange={setTipo}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent>
                {tiposPermitidos.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo.replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Archivo</Label>
            <Input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setArchivo(e.target.files?.[0] || null)}
            />
          </div>

          {/* 🛠️ Campo visible solo si aplica (opcional para depuración o mostrarle al admin) */}
          {tiposConFormulario.includes(tipo) && formularioId && (
            <div>
              <Label>ID del formulario</Label>
              <Input value={formularioId} disabled />
            </div>
          )}
        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleUpload} disabled={loading}>
            {loading ? 'Subiendo...' : 'Subir'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubirDocumentoAdminModal;

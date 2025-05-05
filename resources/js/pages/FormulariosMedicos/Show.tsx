import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
  Card, CardHeader, CardTitle, CardContent, CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  DownloadIcon, Clock, CheckCircle, AlertCircle,
  DollarSign, FileCheck, Shield, Upload
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import axios from 'axios';
import Documentos from './Documentos';

interface Observacion {
  id: number;
  fase: string;
  contenido: string;
  creado_por: { name: string };
  creado_en: string;
  estado: string;
}

interface Formulario {
  estado: string;
  id: number;
  user_id: number;
  primer_apellido: string;
  segundo_apellido: string;
  nombres: string;
  fase_actual: 'pendiente' | 'revision' | 'proceso_pago' | 'constancia_pago' | 'poliza' | 'finalizado';
  observaciones: Observacion[];
  documentos: {
    tipo: string;
    url: string;
    subido_en: string;
  }[];
  pdf_path: string;
}

export default function FormularioShow({ formulario }: { formulario: Formulario }) {
  const [nuevaObservacion, setNuevaObservacion] = useState('');
  const [activeTab, setActiveTab] = useState<Formulario['fase_actual']>(formulario.estado as Formulario['fase_actual']);
  const [formularioData, setFormularioData] = useState(formulario);

  const fases = [
    { id: 'pendiente', label: 'Pendiente', icon: <Clock className="h-4 w-4" /> },
    { id: 'revision', label: 'Revisión', icon: <AlertCircle className="h-4 w-4" /> },
    { id: 'proceso_pago', label: 'Proceso Pago', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'constancia_pago', label: 'Constancia', icon: <FileCheck className="h-4 w-4" /> },
    { id: 'poliza', label: 'Póliza', icon: <Shield className="h-4 w-4" /> },
    { id: 'finalizado', label: 'Finalizado', icon: <CheckCircle className="h-4 w-4" /> },
  ];

  const handleAgregarObservacion = async (fase: string) => {
    if (!nuevaObservacion.trim()) return;

    try {
      await axios.post(`/formularios-medicos/${formulario.id}/observaciones`, {
        fase,
        contenido: nuevaObservacion,
      });

      setNuevaObservacion('');
    } catch (error) {
      console.error('Error al agregar la observación:', error);
      alert('Hubo un error al agregar la observación');
    }
  };

  const handleCambiarFase = async (nuevaFase: Formulario['fase_actual']) => {
    try {
      setActiveTab(nuevaFase);

      const response = await axios.post(`/formularios-medicos/${formulario.id}/estado`, {
        estado: nuevaFase,
      });

      setFormularioData((prev) => ({
        ...prev,
        estado: nuevaFase,
        fase_actual: nuevaFase,
      }));

      console.log(response.data.message);
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
      alert('Hubo un error al cambiar el estado del formulario');
    }
  };

  const calcularProgreso = () => {
    const faseIndex = fases.findIndex(f => f.id === formularioData.estado);
    return (faseIndex / (fases.length - 1)) * 100;
  };

  return (
    <AppLayout>
      <Head title={`Formulario Médico - ${formulario.id}`} />
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Formulario #{formulario.id}</h1>
            <p className="text-muted-foreground">
              {formulario.primer_apellido} {formulario.segundo_apellido} {formulario.nombres}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/documentos/${formulario.user_id}`}>
                <DownloadIcon className="mr-2 h-4 w-4" />
                Documentos
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.open(`/pdf/ver2/${formulario.id}`, '_blank')}>
              <DownloadIcon className="mr-2 h-4 w-4" />
              SARLAFT
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.open(`/pdf/ver/${formulario.id}`, '_blank')}>
              <DownloadIcon className="mr-2 h-4 w-4" />
              Médico
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            {fases.map((fase) => (
              <span key={fase.id} className={formularioData.estado === fase.id ? 'font-medium text-primary' : ''}>
                {fase.label}
              </span>
            ))}
          </div>
          <Progress value={calcularProgreso()} className="h-2" />
        </div>

        <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as Formulario['fase_actual'])}>
          <TabsList className="grid w-full grid-cols-6">
            {fases.map((fase) => (
              <TabsTrigger key={fase.id} value={fase.id} className="flex gap-2 items-center">
                {fase.icon}
                <span className="hidden sm:inline">{fase.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {fases.map(fase => (
            <TabsContent key={fase.id} value={fase.id} className="mt-4">
              <FaseContent
                formulario={formularioData}
                fase={fase.id}
                nuevaObservacion={nuevaObservacion}
                setNuevaObservacion={setNuevaObservacion}
                handleAgregarObservacion={handleAgregarObservacion}
                acciones={
                  fase.id === 'pendiente' ? (
                    <Button onClick={() => handleCambiarFase('revision')}>Iniciar Revisión</Button>
                  ) : fase.id === 'revision' ? (
                    <div className="flex gap-2">
                        
                      <Button variant="outline">Solicitar Correcciones</Button>
                      <Button onClick={() => handleCambiarFase('proceso_pago')}>Aprobar y Continuar a Pago</Button>
                    </div>
                  ) : fase.id === 'proceso_pago' ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      <Button>
                        <DollarSign className="mr-2 h-4 w-4" />
                        Generar Factura
                      </Button>
                      <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Subir Comprobante
                      </Button>
                    </div>
                  ) : null
                }
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AppLayout>
  );
}

function FaseContent({
  formulario,
  fase,
  acciones,
  nuevaObservacion,
  setNuevaObservacion,
  handleAgregarObservacion,
}: {
  formulario: Formulario;
  fase: string;
  acciones: React.ReactNode;
  nuevaObservacion: string;
  setNuevaObservacion: (val: string) => void;
  handleAgregarObservacion: (fase: string) => void;
}) {
  const observaciones = (formulario.observaciones || []).filter(
    (obs) => obs.fase === fase && obs.estado === 'pendiente'
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fase: {fase.toUpperCase()}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Observaciones</h3>
            {observaciones.length > 0 ? (
              <ul className="space-y-2 mt-2">
                {observaciones.map((obs) => (
                  <li key={obs.id} className="text-sm border p-2 rounded">
                    <strong>{obs.creado_por.name}</strong>: {obs.contenido}
                    <br />
                    <span className="text-xs text-muted-foreground">{obs.creado_en}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No hay observaciones aún.</p>
            )}
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder="Agregar nueva observación..."
              value={nuevaObservacion}
              onChange={(e) => setNuevaObservacion(e.target.value)}
            />
            <Button onClick={() => handleAgregarObservacion(fase)}>Agregar</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">{acciones}</CardFooter>
    </Card>
  );
}

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
  DollarSign, FileCheck, Shield, Upload, ArrowLeft, ChevronLeft
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import Documentos from './Documentos';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Observacion {
  id: number;
  fase: string;
  contenido: string;
  estado: string;
  resuelta: boolean;
  respuesta: string | null;
  creado_por: {
    name: string;
  };
  creado_en: string;
}

interface Formulario {
  estado: string;
  id: number;
  user_id: number;
  primer_apellido: string;
  segundo_apellido: string;
  nombres: string;
  fase_actual: 'pendiente' | 'revision' | 'expedicion' | 'proceso_pago' | 'constancia_pago' | 'poliza' | 'finalizado';
  observaciones: Observacion[];
  documentos: {
    tipo: string;
    url: string;
    subido_en: string;
  }[];
  pdf_path: string;
  admin?: { name: string };
  link_pago?: string;
  comprobante_pago_path?: string;
  constancia_pago_path?: string;
  poliza_path?: string;
}

export default function FormularioShow({ formulario }: { formulario: Formulario }) {
  const [nuevaObservacion, setNuevaObservacion] = useState('');
  const [activeTab, setActiveTab] = useState<Formulario['fase_actual']>(formulario.estado as Formulario['fase_actual']);
  const [formularioData, setFormularioData] = useState(formulario);
  const [linkPago, setLinkPago] = useState('');
  const [showRetrocederDialog, setShowRetrocederDialog] = useState(false);
  const [faseARetroceder, setFaseARetroceder] = useState<Formulario['fase_actual']>('pendiente');

  const fases = [
    { id: 'pendiente', label: 'Pendiente', icon: <Clock className="h-4 w-4" /> },
    { id: 'revision', label: 'Revisión', icon: <AlertCircle className="h-4 w-4" /> },
    { id: 'expedicion', label: 'Expedición', icon: <CheckCircle className="h-4 w-4" /> },
    { id: 'proceso_pago', label: 'Proceso Pago', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'constancia_pago', label: 'Constancia', icon: <FileCheck className="h-4 w-4" /> },
    { id: 'poliza', label: 'Póliza', icon: <Shield className="h-4 w-4" /> },
    { id: 'finalizado', label: 'Finalizado', icon: <CheckCircle className="h-4 w-4" /> },
  ];
  
  const faseActualIndex = fases.findIndex((f) => f.id === formularioData.estado);

  const handleAgregarObservacion = async (fase: string) => {
    if (!nuevaObservacion.trim()) return;

    try {
      const response = await axios.post(`/formularios-medicos/${formulario.id}/observaciones`, {
        fase,
        contenido: nuevaObservacion,
      });
    
      const nueva = response.data.observacion;
    
      setFormularioData((prev) => ({
        ...prev,
        observaciones: [...prev.observaciones, nueva],
      }));
    
      setNuevaObservacion('');
      toast.success('Observación agregada correctamente');
    } catch (error) {
      console.error('Error al agregar la observación:', error);
      toast.error('Hubo un error al agregar la observación');
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

      toast.success(`Formulario movido a fase: ${fases.find(f => f.id === nuevaFase)?.label}`);
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
      toast.error('Hubo un error al cambiar el estado del formulario');
    }
  };

  const confirmarRetrocesoFase = () => {
    const currentIndex = fases.findIndex(f => f.id === formularioData.estado);
    if (currentIndex <= 0) return;

    const faseAnterior = fases[currentIndex - 1].id as Formulario['fase_actual'];
    setFaseARetroceder(faseAnterior);
    setShowRetrocederDialog(true);
  };

  const handleRetrocederFase = async () => {
    setShowRetrocederDialog(false);
    try {
      await handleCambiarFase(faseARetroceder);
    } catch (error) {
      console.error('Error al retroceder fase:', error);
      toast.error('Error al retroceder fase');
    }
  };

  const calcularProgreso = () => {
    const faseIndex = fases.findIndex(f => f.id === formularioData.estado);
    return (faseIndex / (fases.length - 1)) * 100;
  };

  const handleGuardarPago = async () => {
    if (!linkPago.trim()) {
      toast('Debes proporcionar el link de pago.');
      return;
    }

    try {
      await axios.post(`/formularios-medicos/${formulario.id}/proceso-pago`, {
        link_pago: linkPago,
      });

      toast.success('Link guardado correctamente');
      setFormularioData((prev) => ({
        ...prev,
        link_pago: linkPago,
      }));
    } catch (error: any) {
      if (error.response?.status === 422) {
        toast.error('El link debe ser una URL válida.');
      } else {
        console.error('Error al guardar el link:', error);
        toast.error('No se pudo guardar el link.');
      }
    }
  };

  return (
    <AppLayout>
      <Head title={`Formulario Médico - ${formulario.id}`} />
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/usuarios/${formulario.user_id}`}>
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Volver al perfil
                </Link>
              </Button>
            </div>
            <h1 className="text-2xl font-bold">Formulario #{formulario.id}</h1>
            <p className="text-muted-foreground">
              {formulario.primer_apellido} {formulario.segundo_apellido} {formulario.nombres}
            </p>
            <p className="text-sm text-muted-foreground">
              Administrador: {formulario.admin?.name || 'No disponible'}
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
          <TabsList className="grid w-full grid-cols-7">
            {fases.map((fase, index) => (
              <TabsTrigger
                key={fase.id}
                value={fase.id}
                className="flex gap-2 items-center"
                disabled={index > faseActualIndex}
              >
                {fase.icon}
                <span className="hidden sm:inline">{fase.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {fases.map(fase => (
            <TabsContent key={fase.id} value={fase.id} className="mt-4">
              {fase.id === 'proceso_pago' ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Link de pago</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Input
                          type="url"
                          placeholder="https://..."
                          value={linkPago}
                          onChange={(e) => setLinkPago(e.target.value)}
                        />
                        {formularioData.link_pago && (
                          <div className="flex items-center justify-between mt-2">
                            <a
                              href={formularioData.link_pago}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              Ver enlace guardado
                            </a>
                            <span className="text-xs text-muted-foreground">
                              (Se puede editar y volver a guardar)
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleGuardarPago}>
                        <Upload className="mr-2 h-4 w-4" />
                        Guardar link de pago
                      </Button>
                    </CardFooter>
                    <CardHeader>
                      <Label htmlFor="recibo_pago">Recibo de pago (PDF)</Label>
                    </CardHeader>
                    <CardContent>
                      <Input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const formData = new FormData();
                            formData.append('documento', file);
                            formData.append('tipo', 'recibo_pago');

                            axios.post(`/formularios-medicos/${formulario.id}/comprobante-pago`, formData)
                              .then(() => {
                                toast.success('Recibo de pago subido correctamente');
                              })
                              .catch(() => {
                                toast.error('Error al subir el recibo de pago');
                              });
                          }
                        }}
                      />

                      {formularioData.comprobante_pago_path && (
                        <div className="mt-2">
                          <a
                            href={formularioData.comprobante_pago_path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm underline"
                          >
                            Ver comprobante de pago
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <FaseContent
                    formulario={formularioData}
                    fase={fase.id}
                    nuevaObservacion={nuevaObservacion}
                    setNuevaObservacion={setNuevaObservacion}
                    handleAgregarObservacion={handleAgregarObservacion}
                    acciones={
                      <div className="flex justify-between w-full mt-4">
                        <Button variant="outline" onClick={confirmarRetrocesoFase}>
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Retroceder fase
                        </Button>
                        <Button onClick={() => handleCambiarFase('constancia_pago')}>
                          Aprobar y Continuar a Constancia
                        </Button>
                      </div>
                    }
                  />
                </div>
              ) : fase.id === 'constancia_pago' ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Constancia de Pago</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {formularioData.constancia_pago_path ? (
                        formularioData.constancia_pago_path.endsWith('.pdf') ? (
                          <a
                            href={formularioData.constancia_pago_path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            Ver constancia de pago (PDF)
                          </a>
                        ) : (
                          <img
                            src={formularioData.constancia_pago_path}
                            alt="Constancia de pago"
                            className="block mx-auto rounded border shadow max-w-md max-h-[700px] object-contain"
                          />
                        )
                      ) : (
                        <p className="text-sm text-muted-foreground">No se ha subido constancia aún.</p>
                      )}

                      <div>
                        <Label htmlFor="constancia_pago">Subir constancia de pago</Label>
                        <Input
                          type="file"
                          accept="application/pdf,image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const formData = new FormData();
                              formData.append('documento', file);

                              axios
                                .post(`/formulario/${formulario.id}/constancia-pago`, formData, {
                                  headers: {
                                    'Content-Type': 'multipart/form-data',
                                  },
                                })
                                .then((res) => {
                                  toast.success('Constancia de pago subida correctamente');
                                  setFormularioData((prev) => ({
                                    ...prev,
                                    constancia_pago_path: res.data.url,
                                  }));
                                })
                                .catch((error) => {
                                  if (error.response?.status === 422) {
                                    toast.error('Archivo no válido (solo PDF, JPG, PNG, máx 5MB).');
                                  } else {
                                    toast.error('Error al subir la constancia de pago.');
                                  }
                                });
                            }
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <FaseContent
                    formulario={formularioData}
                    fase={fase.id}
                    nuevaObservacion={nuevaObservacion}
                    setNuevaObservacion={setNuevaObservacion}
                    handleAgregarObservacion={handleAgregarObservacion}
                    acciones={
                      <div className="flex justify-between w-full mt-4">
                        <Button variant="outline" onClick={confirmarRetrocesoFase}>
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Retroceder fase
                        </Button>
                        <Button onClick={() => handleCambiarFase('poliza')}>
                          Aprobar y Continuar a Póliza
                        </Button>
                      </div>
                    }
                  />
                </div>
              ) : fase.id === 'poliza' ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Subir Póliza (PDF)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const formData = new FormData();
                            formData.append('documento', file);

                            axios
                              .post(`/formularios-medicos/${formulario.id}/poliza`, formData, {
                                headers: {
                                  'Content-Type': 'multipart/form-data',
                                },
                              })
                              .then((res) => {
                                toast.success('Póliza subida correctamente');
                                setFormularioData((prev) => ({
                                  ...prev,
                                  poliza_path: res.data.url,
                                  estado: 'finalizado',
                                  fase_actual: 'finalizado',
                                }));
                              })
                              .catch((error) => {
                                if (error.response?.status === 422) {
                                  toast.error('Archivo no válido (solo PDF, máx 5MB).');
                                } else {
                                  toast.error('Error al subir la póliza.');
                                }
                              });
                          }
                        }}
                      />

                      {formularioData.poliza_path && (
                        <div className="mt-4">
                          {formularioData.poliza_path.endsWith('.pdf') ? (
                            <a
                              href={formularioData.poliza_path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              Ver Póliza (PDF)
                            </a>
                          ) : (
                            <img
                              src={formularioData.poliza_path}
                              alt="Póliza"
                              className="block mx-auto rounded border shadow max-w-md max-h-[700px] object-contain"
                            />
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  <FaseContent
                    formulario={formularioData}
                    fase={fase.id}
                    nuevaObservacion={nuevaObservacion}
                    setNuevaObservacion={setNuevaObservacion}
                    handleAgregarObservacion={handleAgregarObservacion}
                    acciones={
                      <div className="flex justify-between w-full mt-4">
                        <Button variant="outline" onClick={confirmarRetrocesoFase}>
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Retroceder fase
                        </Button>
                        <Button
                          variant="default"
                          onClick={() => handleCambiarFase('finalizado')}
                          disabled={formularioData.estado === 'finalizado'}
                        >
                          Finalizar
                        </Button>
                      </div>
                    }
                  />
                </div>
              ) : (
                <FaseContent
                  formulario={formularioData}
                  fase={fase.id}
                  nuevaObservacion={nuevaObservacion}
                  setNuevaObservacion={setNuevaObservacion}
                  handleAgregarObservacion={handleAgregarObservacion}
                  acciones={
                    <div className="flex justify-between w-full mt-4">
                      {fase.id !== 'pendiente' && (
                        <Button variant="outline" onClick={confirmarRetrocesoFase}>
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Retroceder fase
                        </Button>
                      )}
                      <div className="flex gap-2">
                        {fase.id === 'pendiente' ? (
                          <Button onClick={() => handleCambiarFase('revision')}>Iniciar Revisión</Button>
                        ) : fase.id === 'revision' ? (
                          <Button onClick={() => handleCambiarFase('expedicion')}>Aprobar y Continuar a Expedición</Button>
                        ) : fase.id === 'expedicion' ? (
                          <Button onClick={() => handleCambiarFase('proceso_pago')}>Aprobar y Continuar a Pago</Button>
                        ) : null}
                      </div>
                    </div>
                  }
                />
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* AlertDialog para confirmar retroceso de fase */}
        <AlertDialog open={showRetrocederDialog} onOpenChange={setShowRetrocederDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Confirmas que deseas retroceder de fase?</AlertDialogTitle>
              <AlertDialogDescription>
                El formulario volverá a la fase anterior: <strong>{fases.find(f => f.id === faseARetroceder)?.label}</strong>.
                ¿Estás seguro que deseas continuar?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleRetrocederFase}>Confirmar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
    (obs) => obs.fase === fase
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
                    <div className="space-y-1">
                      <p>
                        <strong>{obs.creado_por.name}</strong>: {obs.contenido}
                      </p>
                      <span className="text-xs text-muted-foreground">{obs.creado_en}</span>

                      {obs.respuesta && (
                        <div className="mt-2 px-3 py-2 rounded border border-green-600 bg-green-900 bg-opacity-20 text-sm text-green-200">
                          <strong className="block text-green-300 mb-1">Respuesta del usuario:</strong>
                          <p className="m-0">{obs.respuesta}</p>
                        </div>
                      )}
                    </div>
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
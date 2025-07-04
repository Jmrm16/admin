import React, { useState } from 'react';
import { Documento } from '@/types/Documento';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DownloadIcon, FileText, X, ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import SubirDocumentoAdminModal from './ModalDocumentos';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Link } from '@inertiajs/react';

type Props = {
  documentos: Documento[];
  userId: number | string;
};

const Documentos: React.FC<Props> = ({ documentos, userId }) => {
  const [selectedDocument, setSelectedDocument] = useState<Documento | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSubir, setModalSubir] = useState(false);

  const openModal = (documento: Documento) => {
    setSelectedDocument(documento);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
  };

  const downloadDocument = (url: string) => {
    window.open(`/storage/${url}`, '_blank');
  };

  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const from = params.get('from') || '/';
  const formularioId = params.get('formulario_medico_id')
    ? Number(params.get('formulario_medico_id'))
    : undefined;

  return (
    <AppLayout>
      <div className="flex flex-col gap-4 p-4 rounded-xl">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href={from}>
                <ArrowLeft className="mr-1 h-4 w-4" />
                Volver
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Documentos</h1>
          </div>

          <Button
            onClick={() => setModalSubir(true)}
            className="bg-white text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            Subir documento
          </Button>
        </div>

        <SubirDocumentoAdminModal
          open={modalSubir}
          onClose={() => setModalSubir(false)}
          userId={typeof userId === 'string' ? Number(userId) : userId}
          formularioId={formularioId}
          onUploadSuccess={() => window.location.reload()}
        />

        {/* Documentos generales */}
        {documentos.filter(d => !d.formulario_medico_id).length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-muted-foreground mb-2">📁 Documentos generales</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
              {documentos.filter(d => !d.formulario_medico_id).map((documento) => (
                <Card key={documento.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{documento.tipo}</CardTitle>
                      <Badge
                        variant={documento.estado === 'Aprobado' ? 'default' : 'destructive'}
                        className="capitalize"
                      >
                        {documento.estado}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium">Tipo:</span> {documento.tipo}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">Estado:</span> {documento.estado}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openModal(documento)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Ver Detalles
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => downloadDocument(documento.archivo)}>
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Descargar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Documentos del formulario */}
        {documentos.filter(d => d.formulario_medico_id).length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-muted-foreground mb-2">📋 Documentos del formulario actual</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {documentos.filter(d => d.formulario_medico_id).map((documento) => (
                <Card key={documento.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{documento.tipo}</CardTitle>
                      <Badge
                        variant={documento.estado === 'Aprobado' ? 'default' : 'destructive'}
                        className="capitalize"
                      >
                        {documento.estado}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium">Tipo:</span> {documento.tipo}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">Estado:</span> {documento.estado}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openModal(documento)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Ver Detalles
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => downloadDocument(documento.archivo)}>
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Descargar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Modal vista previa */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-4xl w-full max-w-[1200px]">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{selectedDocument?.tipo_legible}</span>
                <Button variant="ghost" size="icon" onClick={closeModal} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
              <DialogDescription>
                <Badge variant={selectedDocument?.estado === 'Aprobado' ? 'default' : 'destructive'}>
                  {selectedDocument?.estado}
                </Badge>
              </DialogDescription>
            </DialogHeader>

            {selectedDocument && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Información del documento</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Tipo</p>
                      <p>{selectedDocument.tipo_legible}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Estado</p>
                      <p>{selectedDocument.estado}</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Vista previa</h4>
                  <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded p-8">
                    <iframe
                      src={`/storage/${selectedDocument.archivo}`}
                      className="w-full h-[700px] min-h-[600px] border-0 rounded-md shadow"
                      title={`Documento ${selectedDocument.tipo_legible}`}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={closeModal}>
                    Cerrar
                  </Button>
                  <Button onClick={() => downloadDocument(selectedDocument.archivo)}>
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Descargar
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Documentos;
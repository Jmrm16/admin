import React, { useState } from 'react';
import { Documento } from '@/types/Documento';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DownloadIcon, FileText, X } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

type Props = {
  documentos: Documento[];
};

const Documentos: React.FC<Props> = ({ documentos }) => {
  const [selectedDocument, setSelectedDocument] = useState<Documento | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(documentos);
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

  return (
    <AppLayout>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <h1 className="text-2xl font-bold tracking-tight mb-6">Documentos</h1>
        
        {documentos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">No hay documentos disponibles</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {documentos.map((documento) => (
              <Card key={documento.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{documento.tipo}</CardTitle>
                    <Badge variant={documento.estado === 'Aprobado' ? 'default' : 'destructive'}>
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openModal(documento)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Ver Detalles
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => downloadDocument(documento.archivo)}
                    >
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Descargar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Document Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{selectedDocument?.tipo_legible}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeModal}
                  className="h-8 w-8"
                >
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
                  <div className="flex items-center justify-center bg-gray-50 rounded p-8">
                    <iframe
                      src={`/storage/${selectedDocument.archivo}`}
                      className="w-full h-96 border-0"
                      title={`Documento ${selectedDocument.tipo_legible}`}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={closeModal}
                  >
                    Cerrar
                  </Button>
                  <Button
                    onClick={() => downloadDocument(selectedDocument.archivo)}
                  >
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
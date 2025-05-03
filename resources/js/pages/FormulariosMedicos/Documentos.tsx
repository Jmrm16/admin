import React from 'react';
import { Documento } from '@/types/Documento'; // Asegúrate de que este tipo esté correctamente definido
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

type Props = {
    documentos: Documento[];
};

const Documentos: React.FC<Props> = ({ documentos }) => {
    return (
        <AppLayout>
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold tracking-tight mb-6">Documentos</h1>
            <div className="space-y-6">
                {documentos.map((documento) => (
                    <Card key={documento.id}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xl">{documento.tipo_legible}</CardTitle>
                                <Badge variant={documento.estado === 'Aprobado' ? 'default' : 'destructive'}>
                                    {documento.estado}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 mb-4">
                                <strong>Tipo:</strong> {documento.tipo_legible}
                            </p>
                            <p className="text-sm text-gray-600 mb-4">
                                <strong>Estado:</strong> {documento.estado}
                            </p>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(`/storage/${documento.archivo}`, '_blank')}
                            >
                                <DownloadIcon className="mr-2 h-4 w-4" />
                                Ver Documento
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
        </AppLayout>
    );
};

export default Documentos;

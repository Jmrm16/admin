import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { DownloadIcon, FileText, User, CreditCard, Briefcase, Building, Stethoscope, FileInput } from 'lucide-react';
import { JSX } from 'react/jsx-runtime';
import React from 'react';

interface Formulario {
    id: number;
    user_id: number;
    fecha: string;
    sucursal: string;
    ciudad: string;
    tipo_solicitud: string;
    clase_vinculacion: string;
    sector_actividad: string;
    cual: string;
    persona_pep: string;
    pdf_path: string;
    primer_apellido: string;
    segundo_apellido: string;
    nombres: string;
    tipo_documento: string;
    numero_identificacion: string;
    fecha_expedicion: string;
    lugar_expedicion: string;
    fecha_nacimiento: string;
    lugar_nacimiento: string;
    nacionalidad_1: string;
    nacionalidad_2: string;
    email: string;
    celular: string;
    direccion: string;
    ciudad_residencia: string;
    departamento: string;
    titulo_profesional: string;
    otorgado_por: string;
    fecha_graduacion: string;
    especialidad: string;
    direccion_general: string;
    registro_profesional: string;
    actividad_principal: string;
    suma_asegurada: string;
    codigo_ciiu: string;
    ocupacion: string;
    cargo: string;
    empresa: string;
    direccion_empresa: string;
    ciudad_empresa: string;
    departamento_empresa: string;
    telefono_empresa: string;
    nombre_institucion: string;
    tipo_servicios: string;
    funcion_solicitante: string;
    relacion_institucion: string;
    nombre_empleador: string;
    ubicacion_trabajo: string;
    descripcion_labores: string;
    ejercicio_privado: string;
    ubicacion_consultorio: string;
    Numero_especializacion: string;
    equipo_radiografia: string;
    equipo_rayos_x: string;
    equipo_tomografia: string;
    equipo_laser: string;
    equipo_medicina_nuclear: string;
    alojar_pacientes: string;
    tratamiento_ambulatorio: string;
    otros_riesgos: string;
    ejercicio_exclusivo: string;
    prestacion_servicios: string;
    ejercicio_laboral: string;
    ejercicio_otras_ocasiones: string;
    reclamacion_responsabilidad: string;
    circunstancia_responsabilidad: string;
    seguro_responsabilidad: string;
    rehusada_cancelada_poliza: string;
    detalles_alojar_pacientes: string;
    detalles_tratamiento_ambulatorio: string;
    detalles_otros_riesgos: string;
    detalles_ejercicio_otras_ocasiones: string;
    detalles_reclamacion_responsabilidad: string;
    detalles_circunstancia_responsabilidad: string;
    detalles_rehusada_cancelada_poliza: string;
    compania_seguros: string;
    vigencia_poliza: string;
    limite_asegurado: string;
    ingresos_mensuales: string;
    otros_ingresos: string;
    concepto_otros_ingresos: string;
    egresos_mensuales: string;
    activos: string;
    pasivos: string;
    patrimonio: string;
    pep: string;
    vinculo_pep: string;
    administra_recursos_publicos: string;
    operaciones_internacionales: string;
    detalles_operaciones_internacionales: string;
    obligaciones_tributarias: string;
    detalles_obligaciones_tributarias: string;
    responsable_rut: string;
    codigo_responsabilidad: string;
    correo_dian: string;
    autorizacion_datos: string;
    especializaciones: string;
    intermediario: string;
    intermediario_in: string;
    direccion_in: string;
    fondos: string;
}

interface Props {
    formulario: Formulario;
}

type FieldType = 'text' | 'date' | 'email' | 'phone' | 'currency' | 'badge' | 'textarea';

interface FormField {
    label: string;
    value?: string | number | null;
    type?: FieldType;
    custom?: React.ReactNode;
}

interface FormSection {
    title: string;
    icon: React.ReactNode;
    cols?: number;
    fields: FormField[];
}

export default function FormularioShow({ formulario }: Props) {
    const sections: FormSection[] = [
        {
            title: "Información Básica",
            icon: <FileInput className="h-5 w-5" />,
            fields: [
                { label: "ID", value: formulario.id },
                { label: "Fecha", value: formulario.fecha, type: "date" },
                { label: "Sucursal", value: formulario.sucursal },
                { label: "Ciudad", value: formulario.ciudad },
                { label: "Tipo de Solicitud", value: formulario.tipo_solicitud },
                { label: "Clase de Vinculación", value: formulario.clase_vinculacion },
                { label: "Sector de Actividad", value: formulario.sector_actividad },
                { label: "Cual", value: formulario.cual },
                { label: "Persona PEP", value: formulario.persona_pep, type: "badge" }
            ]
        },
        {
            title: "Datos Personales",
            icon: <User className="h-5 w-5" />,
            fields: [
                { label: "Nombre Completo", value: `${formulario.primer_apellido} ${formulario.segundo_apellido} ${formulario.nombres}` },
                { label: "Tipo Documento", value: formulario.tipo_documento },
                { label: "Número Identificación", value: formulario.numero_identificacion },
                { label: "Fecha Expedición", value: formulario.fecha_expedicion, type: "date" },
                { label: "Lugar Expedición", value: formulario.lugar_expedicion },
                { label: "Fecha Nacimiento", value: formulario.fecha_nacimiento, type: "date" },
                { label: "Lugar Nacimiento", value: formulario.lugar_nacimiento },
                { label: "Nacionalidad 1", value: formulario.nacionalidad_1 },
                { label: "Nacionalidad 2", value: formulario.nacionalidad_2 },
                { label: "Email", value: formulario.email, type: "email" },
                { label: "Celular", value: formulario.celular, type: "phone" },
                { label: "Dirección", value: formulario.direccion },
                { label: "Ciudad Residencia", value: formulario.ciudad_residencia },
                { label: "Departamento", value: formulario.departamento }
            ]
        },
        {
            title: "Información Profesional",
            icon: <Briefcase className="h-5 w-5" />,
            cols: 2,
            fields: [
                { label: "Título Profesional", value: formulario.titulo_profesional },
                { label: "Otorgado por", value: formulario.otorgado_por },
                { label: "Fecha Graduación", value: formulario.fecha_graduacion, type: "date" },
                { label: "Especialidad", value: formulario.especialidad },
                { label: "Dirección General", value: formulario.direccion_general },
                { label: "Registro Profesional", value: formulario.registro_profesional },
                { label: "Actividad Principal", value: formulario.actividad_principal },
                { label: "Suma Asegurada", value: formulario.suma_asegurada, type: "currency" },
                { label: "Código CIIU", value: formulario.codigo_ciiu },
                { label: "Ocupación", value: formulario.ocupacion },
                { label: "Cargo", value: formulario.cargo }
            ]
        },
        {
            title: "Información Laboral",
            icon: <Building className="h-5 w-5" />,
            cols: 2,
            fields: [
                { label: "Empresa", value: formulario.empresa },
                { label: "Dirección Empresa", value: formulario.direccion_empresa },
                { label: "Ciudad Empresa", value: formulario.ciudad_empresa },
                { label: "Departamento Empresa", value: formulario.departamento_empresa },
                { label: "Teléfono Empresa", value: formulario.telefono_empresa, type: "phone" },
                { label: "Nombre Institución", value: formulario.nombre_institucion },
                { label: "Tipo Servicios", value: formulario.tipo_servicios },
                { label: "Función Solicitante", value: formulario.funcion_solicitante },
                { label: "Relación Institución", value: formulario.relacion_institucion },
                { label: "Nombre Empleador", value: formulario.nombre_empleador },
                { label: "Ubicación Trabajo", value: formulario.ubicacion_trabajo },
                { label: "Descripción Labores", value: formulario.descripcion_labores, type: "textarea" }
            ]
        },
        {
            title: "Información Médica",
            icon: <Stethoscope className="h-5 w-5" />,
            fields: [
                { label: "Ejercicio Privado", value: formulario.ejercicio_privado, type: "badge" },
                { label: "Ubicación Consultorio", value: formulario.ubicacion_consultorio },
                { label: "Número Especialización", value: formulario.Numero_especializacion },
                { 
                    label: "Equipos Médicos", 
                    custom: (
                        <div className="flex flex-wrap gap-2">
                            {formulario.equipo_radiografia && <Badge variant="secondary">Radiografía</Badge>}
                            {formulario.equipo_rayos_x && <Badge variant="secondary">Rayos X</Badge>}
                            {formulario.equipo_tomografia && <Badge variant="secondary">Tomografía</Badge>}
                            {formulario.equipo_laser && <Badge variant="secondary">Láser</Badge>}
                            {formulario.equipo_medicina_nuclear && <Badge variant="secondary">Medicina Nuclear</Badge>}
                        </div>
                    )
                },
                { label: "Alojar Pacientes", value: formulario.alojar_pacientes, type: "badge" },
                { label: "Detalles Alojar Pacientes", value: formulario.detalles_alojar_pacientes, type: "textarea" },
                { label: "Tratamiento Ambulatorio", value: formulario.tratamiento_ambulatorio, type: "badge" },
                { label: "Detalles Tratamiento Ambulatorio", value: formulario.detalles_tratamiento_ambulatorio, type: "textarea" },
                { label: "Otros Riesgos", value: formulario.otros_riesgos, type: "badge" },
                { label: "Detalles Otros Riesgos", value: formulario.detalles_otros_riesgos, type: "textarea" }
            ]
        },
        {
            title: "Información Financiera",
            icon: <CreditCard className="h-5 w-5" />,
            cols: 2,
            fields: [
                { label: "Ingresos Mensuales", value: formulario.ingresos_mensuales, type: "currency" },
                { label: "Otros Ingresos", value: formulario.otros_ingresos, type: "currency" },
                { label: "Concepto Otros Ingresos", value: formulario.concepto_otros_ingresos },
                { label: "Egresos Mensuales", value: formulario.egresos_mensuales, type: "currency" },
                { label: "Activos", value: formulario.activos, type: "currency" },
                { label: "Pasivos", value: formulario.pasivos, type: "currency" },
                { label: "Patrimonio", value: formulario.patrimonio, type: "currency" },
                { label: "Compañía Seguros", value: formulario.compania_seguros },
                { label: "Vigencia Póliza", value: formulario.vigencia_poliza, type: "date" },
                { label: "Límite Asegurado", value: formulario.limite_asegurado, type: "currency" }
            ]
        }
    ];

    return (
        <AppLayout>
            <Head title={`Formulario Médico - ${formulario.id}`} />

            <div className="container mx-auto py-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Formulario #{formulario.id}</h1>
                        <p className="text-muted-foreground">
                            {formulario.primer_apellido} {formulario.segundo_apellido} {formulario.nombres}
                        </p>
                    </div>
                    <div className="flex gap-2">
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

                {/* Form Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sections.map((section, index) => (
                        <Card 
                            key={index} 
                            className={section.cols ? `md:col-span-${section.cols}` : ''}
                        >
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    {section.icon}
                                    {section.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                {section.fields.map((field, fieldIndex) => (
                                    <div key={fieldIndex} className="space-y-2">
                                        {field.custom ? (
                                            <>
                                                <p className="text-sm font-medium text-muted-foreground">
                                                    {field.label}
                                                </p>
                                                {field.custom}
                                            </>
                                        ) : (
                                            field.value !== undefined && field.value !== null && (
                                                <DetailItem 
                                                    label={field.label} 
                                                    value={field.value} 
                                                    type={field.type} 
                                                />
                                            )
                                        )}
                                        {fieldIndex < section.fields.length - 1 && (
                                            <Separator className="my-2" />
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Document Section */}
                {formulario.pdf_path && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Documentos Adjuntos
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" asChild>
                                <a 
                                    href={formulario.pdf_path} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center"
                                >
                                    <DownloadIcon className="mr-2 h-4 w-4" />
                                    Descargar PDF completo
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}

interface DetailItemProps {
    label: string;
    value: string | number | null;
    type?: FieldType;
}

function DetailItem({ label, value, type = 'text' }: DetailItemProps) {
    const formattedValue = React.useMemo(() => {
        if (value === null || value === undefined || value === '') return null;

        switch (type) {
            case 'date':
                return new Date(value).toLocaleDateString('es-CO');
            case 'currency':
                return new Intl.NumberFormat('es-CO', { 
                    style: 'currency', 
                    currency: 'COP',
                    minimumFractionDigits: 0
                }).format(Number(value));
            case 'badge':
                return (
                    <Badge variant={value === 'Sí' ? 'default' : 'outline'}>
                        {String(value)}
                    </Badge>
                );
            case 'textarea':
                return (
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {String(value)}
                    </p>
                );
            case 'email':
                return (
                    <a href={`mailto:${value}`} className="text-primary hover:underline">
                        {String(value)}
                    </a>
                );
            case 'phone':
                return (
                    <a href={`tel:${value}`} className="text-primary hover:underline">
                        {String(value)}
                    </a>
                );
            default:
                return String(value);
        }
    }, [value, type]);

    if (!formattedValue) return null;

    return (
        <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            {type === 'textarea' ? (
                formattedValue
            ) : (
                <p className="text-sm">{formattedValue}</p>
            )}
        </div>
    );
}

// Removed the incorrect custom useMemo function.

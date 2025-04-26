import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { DownloadIcon, PrinterIcon } from 'lucide-react';

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

export default function FormularioShow({ formulario }: Props) {
    return (
        <AppLayout>
            <Head title={`Formulario Médico - ${formulario.id}`} />

            <div className="container mx-auto py-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Formulario Médico</h1>
                        <p className="text-muted-foreground">Detalles completos del formulario</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => window.open(`/pdf/ver2/${formulario.id}`, '_blank')}>
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Ver Formulario Sarlaft
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => window.open(`/pdf/ver/${formulario.id}`, '_blank')}>
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Ver Formulario Medico
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Información Básica */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                Información Básica
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <DetailItem label="ID" value={formulario.id} />
                            <DetailItem label="Fecha" value={formulario.fecha} type="date" />
                            <DetailItem label="Sucursal" value={formulario.sucursal} />
                            <DetailItem label="Ciudad" value={formulario.ciudad} />
                            <DetailItem label="Tipo de Solicitud" value={formulario.tipo_solicitud} />
                            <DetailItem label="Clase de Vinculación" value={formulario.clase_vinculacion} />
                            <DetailItem label="Sector de Actividad" value={formulario.sector_actividad} />
                            <DetailItem label="Cual" value={formulario.cual} />
                            <DetailItem label="Persona PEP" value={formulario.persona_pep} type="badge" />
                        </CardContent>
                    </Card>

                    {/* Datos Personales */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                                Datos Personales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <DetailItem label="Nombre Completo" 
                                value={`${formulario.primer_apellido} ${formulario.segundo_apellido} ${formulario.nombres}`} 
                            />
                            <DetailItem label="Tipo Documento" value={formulario.tipo_documento} />
                            <DetailItem label="Número Identificación" value={formulario.numero_identificacion} />
                            <DetailItem label="Fecha Expedición" value={formulario.fecha_expedicion} type="date" />
                            <DetailItem label="Lugar Expedición" value={formulario.lugar_expedicion} />
                            <DetailItem label="Fecha Nacimiento" value={formulario.fecha_nacimiento} type="date" />
                            <DetailItem label="Lugar Nacimiento" value={formulario.lugar_nacimiento} />
                            <DetailItem label="Nacionalidad 1" value={formulario.nacionalidad_1} />
                            <DetailItem label="Nacionalidad 2" value={formulario.nacionalidad_2} />
                            <DetailItem label="Email" value={formulario.email} type="email" />
                            <DetailItem label="Celular" value={formulario.celular} type="phone" />
                            <DetailItem label="Dirección" value={formulario.direccion} />
                            <DetailItem label="Ciudad Residencia" value={formulario.ciudad_residencia} />
                            <DetailItem label="Departamento" value={formulario.departamento} />
                        </CardContent>
                    </Card>

                    {/* Información Profesional */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <rect x="2" y="7" width="20" height="14" rx="2"></rect>
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                </svg>
                                Información Profesional
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <DetailItem label="Título Profesional" value={formulario.titulo_profesional} />
                                <DetailItem label="Otorgado por" value={formulario.otorgado_por} />
                                <DetailItem label="Fecha Graduación" value={formulario.fecha_graduacion} type="date" />
                                <DetailItem label="Especialidad" value={formulario.especialidad} />
                                <DetailItem label="Dirección General" value={formulario.direccion_general} />
                                <DetailItem label="Registro Profesional" value={formulario.registro_profesional} />
                                <DetailItem label="Actividad Principal" value={formulario.actividad_principal} />
                                <DetailItem label="Suma Asegurada" value={formulario.suma_asegurada} type="currency" />
                                <DetailItem label="Código CIIU" value={formulario.codigo_ciiu} />
                                <DetailItem label="Ocupación" value={formulario.ocupacion} />
                                <DetailItem label="Cargo" value={formulario.cargo} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Información Laboral */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                                    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                                    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                                    <path d="M10 6h4"></path>
                                    <path d="M10 10h4"></path>
                                    <path d="M10 14h4"></path>
                                    <path d="M10 18h4"></path>
                                </svg>
                                Información Laboral
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <DetailItem label="Empresa" value={formulario.empresa} />
                                <DetailItem label="Dirección Empresa" value={formulario.direccion_empresa} />
                                <DetailItem label="Ciudad Empresa" value={formulario.ciudad_empresa} />
                                <DetailItem label="Departamento Empresa" value={formulario.departamento_empresa} />
                                <DetailItem label="Teléfono Empresa" value={formulario.telefono_empresa} type="phone" />
                                <DetailItem label="Nombre Institución" value={formulario.nombre_institucion} />
                                <DetailItem label="Tipo Servicios" value={formulario.tipo_servicios} />
                                <DetailItem label="Función Solicitante" value={formulario.funcion_solicitante} />
                                <DetailItem label="Relación Institución" value={formulario.relacion_institucion} />
                                <DetailItem label="Nombre Empleador" value={formulario.nombre_empleador} />
                                <DetailItem label="Ubicación Trabajo" value={formulario.ubicacion_trabajo} />
                            </div>
                            <Separator />
                            <DetailItem label="Descripción Labores" value={formulario.descripcion_labores} type="textarea" />
                        </CardContent>
                    </Card>

                    {/* Información Médica */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
                                    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
                                    <circle cx="20" cy="10" r="2"></circle>
                                </svg>
                                Información Médica
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <DetailItem label="Ejercicio Privado" value={formulario.ejercicio_privado} type="badge" />
                            <DetailItem label="Ubicación Consultorio" value={formulario.ubicacion_consultorio} />
                            <DetailItem label="Número Especialización" value={formulario.Numero_especializacion} />
                            
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">Equipos Médicos</p>
                                <div className="flex flex-wrap gap-2">
                                    {formulario.equipo_radiografia && <Badge variant="secondary">Radiografía</Badge>}
                                    {formulario.equipo_rayos_x && <Badge variant="secondary">Rayos X</Badge>}
                                    {formulario.equipo_tomografia && <Badge variant="secondary">Tomografía</Badge>}
                                    {formulario.equipo_laser && <Badge variant="secondary">Láser</Badge>}
                                    {formulario.equipo_medicina_nuclear && <Badge variant="secondary">Medicina Nuclear</Badge>}
                                </div>
                            </div>
                            
                            <Separator />
                            
                            <DetailItem label="Alojar Pacientes" value={formulario.alojar_pacientes} type="badge" />
                            <DetailItem label="Detalles Alojar Pacientes" value={formulario.detalles_alojar_pacientes} type="textarea" />
                            <DetailItem label="Tratamiento Ambulatorio" value={formulario.tratamiento_ambulatorio} type="badge" />
                            <DetailItem label="Detalles Tratamiento Ambulatorio" value={formulario.detalles_tratamiento_ambulatorio} type="textarea" />
                            <DetailItem label="Otros Riesgos" value={formulario.otros_riesgos} type="badge" />
                            <DetailItem label="Detalles Otros Riesgos" value={formulario.detalles_otros_riesgos} type="textarea" />
                        </CardContent>
                    </Card>

                    {/* Ejercicio Profesional */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <path d="M12 20h9"></path>
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                </svg>
                                Ejercicio Profesional
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <DetailItem label="Ejercicio Exclusivo" value={formulario.ejercicio_exclusivo} type="badge" />
                            <DetailItem label="Prestación Servicios" value={formulario.prestacion_servicios} type="badge" />
                            <DetailItem label="Ejercicio Laboral" value={formulario.ejercicio_laboral} type="badge" />
                            <DetailItem label="Ejercicio Otras Ocasiones" value={formulario.ejercicio_otras_ocasiones} type="badge" />
                            <DetailItem label="Detalles Ejercicio Otras Ocasiones" value={formulario.detalles_ejercicio_otras_ocasiones} type="textarea" />
                            <Separator />
                            <DetailItem label="Reclamación Responsabilidad" value={formulario.reclamacion_responsabilidad} type="badge" />
                            <DetailItem label="Detalles Reclamación Responsabilidad" value={formulario.detalles_reclamacion_responsabilidad} type="textarea" />
                            <DetailItem label="Circunstancia Responsabilidad" value={formulario.circunstancia_responsabilidad} type="badge" />
                            <DetailItem label="Detalles Circunstancia Responsabilidad" value={formulario.detalles_circunstancia_responsabilidad} type="textarea" />
                            <DetailItem label="Seguro Responsabilidad" value={formulario.seguro_responsabilidad} type="badge" />
                            <DetailItem label="Rehusada/Cancelada Póliza" value={formulario.rehusada_cancelada_poliza} type="badge" />
                            <DetailItem label="Detalles Rehusada/Cancelada Póliza" value={formulario.detalles_rehusada_cancelada_poliza} type="textarea" />
                        </CardContent>
                    </Card>

                    {/* Información Financiera */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                                    <circle cx="12" cy="12" r="2"></circle>
                                    <path d="M6 12h.01M18 12h.01"></path>
                                </svg>
                                Información Financiera
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <DetailItem label="Ingresos Mensuales" value={formulario.ingresos_mensuales} type="currency" />
                                <DetailItem label="Otros Ingresos" value={formulario.otros_ingresos} type="currency" />
                                <DetailItem label="Concepto Otros Ingresos" value={formulario.concepto_otros_ingresos} />
                                <DetailItem label="Egresos Mensuales" value={formulario.egresos_mensuales} type="currency" />
                                <DetailItem label="Activos" value={formulario.activos} type="currency" />
                                <DetailItem label="Pasivos" value={formulario.pasivos} type="currency" />
                                <DetailItem label="Patrimonio" value={formulario.patrimonio} type="currency" />
                            </div>
                            <Separator />
                            <DetailItem label="Compañía Seguros" value={formulario.compania_seguros} />
                            <DetailItem label="Vigencia Póliza" value={formulario.vigencia_poliza} type="date" />
                            <DetailItem label="Límite Asegurado" value={formulario.limite_asegurado} type="currency" />
                        </CardContent>
                    </Card>

                    {/* Información PEP y Fiscal */}
                    <Card className="lg:col-span-3">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                                Información PEP y Fiscal
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <DetailItem label="PEP" value={formulario.pep} type="badge" />
                                <DetailItem label="Vínculo PEP" value={formulario.vinculo_pep} />
                                <DetailItem label="Administra Recursos Públicos" value={formulario.administra_recursos_publicos} type="badge" />
                                <DetailItem label="Operaciones Internacionales" value={formulario.operaciones_internacionales} type="badge" />
                                <DetailItem label="Detalles Operaciones Internacionales" value={formulario.detalles_operaciones_internacionales} type="textarea" />
                                <DetailItem label="Obligaciones Tributarias" value={formulario.obligaciones_tributarias} type="badge" />
                                <DetailItem label="Detalles Obligaciones Tributarias" value={formulario.detalles_obligaciones_tributarias} type="textarea" />
                                <DetailItem label="Responsable RUT" value={formulario.responsable_rut} />
                                <DetailItem label="Código Responsabilidad" value={formulario.codigo_responsabilidad} />
                                <DetailItem label="Correo DIAN" value={formulario.correo_dian} type="email" />
                                <DetailItem label="Autorización Datos" value={formulario.autorizacion_datos} type="badge" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Información Adicional */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                </svg>
                                Información Adicional
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <DetailItem label="Especializaciones" value={formulario.especializaciones} />
                            <DetailItem label="Intermediario" value={formulario.intermediario} />
                            <DetailItem label="Intermediario IN" value={formulario.intermediario_in} />
                            <DetailItem label="Dirección IN" value={formulario.direccion_in} />
                            <DetailItem label="Fondos" value={formulario.fondos} />
                            {formulario.pdf_path && (
                                <div className="mt-4">
                                    <Button variant="outline" asChild>
                                        <a href={formulario.pdf_path} target="_blank" rel="noopener noreferrer">
                                            <DownloadIcon className="mr-2 h-4 w-4" />
                                            Ver PDF Adjunto
                                        </a>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

interface DetailItemProps {
    label: string;
    value: string | number | null | undefined;
    type?: 'text' | 'date' | 'email' | 'phone' | 'currency' | 'badge' | 'textarea';
}

function DetailItem({ label, value, type = 'text' }: DetailItemProps) {
    if (!value && value !== 0) return null;

    const formattedValue = () => {
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
                        {value.toString()}
                    </Badge>
                );
            case 'textarea':
                return (
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {value.toString()}
                    </p>
                );
            case 'email':
                return (
                    <a href={`mailto:${value}`} className="text-primary hover:underline">
                        {value.toString()}
                    </a>
                );
            case 'phone':
                return (
                    <a href={`tel:${value}`} className="text-primary hover:underline">
                        {value.toString()}
                    </a>
                );
            default:
                return value.toString();
        }
    };

    return (
        <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            {type === 'textarea' ? (
                formattedValue()
            ) : (
                <p className="text-sm">{formattedValue()}</p>
            )}
        </div>
    );
}
import { Head, Link, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { DownloadIcon, FileText, User, CreditCard, Briefcase, Building, Stethoscope, FileInput, SaveIcon, ArrowLeft } from 'lucide-react';
import { JSX } from 'react/jsx-runtime';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

interface Formulario {
    [key: string]: string | number | undefined;
    estado: string;
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
    detalles_otros_riesgos: string;
    ejercicio_exclusivo: string;
    prestacion_servicios: string;
    ejercicio_laboral: string;
    ejercicio_otras_ocasiones: string;
    detalles_ejercicio_otras_ocasiones: string;
    reclamacion_responsabilidad: string;
    detalles_reclamacion_responsabilidad: string;
    circunstancia_responsabilidad: string;
    detalles_circunstancia_responsabilidad: string;
    seguro_responsabilidad: string;
    compania_seguros: string;
    vigencia_poliza: string;
    limite_asegurado: string;
    rehusada_cancelada_poliza: string;
    detalles_rehusada_cancelada_poliza: string;
    ingresos_mensuales: string;
    otros_ingresos: string;
    concepto_otros_ingresos: string;
    egresos_mensuales: string;
    activos: string;
    pasivos: string;
    patrimonio: string;
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
    producto_servicio: string;
    fondos: string;
}

interface Props {
    formulario: Formulario;
}

type FieldType = 'text' | 'date' | 'email' | 'phone' | 'currency' | 'badge' | 'textarea' | 'select' | 'checkbox' | 'radio';

interface FormField {
    label: string;
    name: string;
    type?: FieldType;
    options?: { value: string; label: string }[];
    cols?: number;
    info?: string;
}

interface FormSection {
    title: string;
    icon: React.ReactNode;
    cols?: number;
    fields: FormField[];
}

export default function FormularioEdit({ formulario }: Props) {
    const { data, setData, put, processing, errors } = useForm<Formulario>({
        ...formulario
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('formularios-medicos.update', formulario.id), {
            onSuccess: () => {
                toast("Formulario actualizado correctamente.");
            },
            onError: () => {
                toast("Hubo un error al guardar los cambios", {
                    description: "Por favor intenta nuevamente."
                });
            }
        });
    };

    const handleChange = (field: keyof Formulario, value: any) => {
        setData({ ...data, [field]: value });
    };

    const formatCurrency = (value: string) => {
        return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleCurrencyChange = (field: keyof Formulario, value: string) => {
        const cleanedValue = value.replace(/\D/g, '');
        setData({ ...data, [field]: cleanedValue });
    };

    const handleCheckboxChange = (field: keyof Formulario, checked: boolean) => {
        setData({ ...data, [field]: checked ? 'SI' : 'NO' });
    };

    const handleRadioChange = (field: keyof Formulario, value: string) => {
        setData({ ...data, [field]: value });
    };

    const handleEspecializacionChange = (value: string) => {
        setData({ ...data, especializaciones: value });
    };

    const sections: FormSection[] = [
        {
            title: "Información Básica",
            icon: <FileInput className="h-5 w-5" />,
            fields: [
                { label: "ID", name: "id", type: "text" },
                { label: "Fecha", name: "fecha", type: "date" },
                { label: "Sucursal", name: "sucursal", type: "text" },
                { label: "Ciudad", name: "ciudad", type: "text" },
                { 
                    label: "Tipo de Solicitud", 
                    name: "tipo_solicitud", 
                    type: "select",
                    options: [
                        { value: "VINCULACION", label: "VINCULACIÓN" },
                        { value: "RENOVACION", label: "RENOVACIÓN" },
                        { value: "ACTUALIZACION", label: "ACTUALIZACIÓN" }
                    ]
                },
                { 
                    label: "Clase de Vinculación", 
                    name: "clase_vinculacion", 
                    type: "text"
                }
            ]
        },
        {
            title: "Datos Personales",
            icon: <User className="h-5 w-5" />,
            fields: [
                { label: "Primer Apellido", name: "primer_apellido", type: "text" },
                { label: "Segundo Apellido", name: "segundo_apellido", type: "text" },
                { label: "Nombres", name: "nombres", type: "text" },
                { 
                    label: "Tipo Documento", 
                    name: "tipo_documento", 
                    type: "select",
                    options: [
                        { value: "C.C.", label: "Cédula de Ciudadanía" },
                        { value: "C.E.", label: "Cédula de Extranjería" },
                        { value: "NUIP", label: "NUIP" },
                        { value: "T.I.", label: "Tarjeta de Identidad" },
                        { value: "PASAPORTE", label: "Pasaporte" }
                    ]
                },
                { label: "Número Identificación", name: "numero_identificacion", type: "text" },
                { label: "Fecha Expedición", name: "fecha_expedicion", type: "date" },
                { label: "Lugar Expedición", name: "lugar_expedicion", type: "text" },
                { label: "Fecha Nacimiento", name: "fecha_nacimiento", type: "date" },
                { label: "Lugar Nacimiento", name: "lugar_nacimiento", type: "text" },
                { label: "Nacionalidad 1", name: "nacionalidad_1", type: "text" },
                { label: "Nacionalidad 2", name: "nacionalidad_2", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Celular", name: "celular", type: "phone" },
                { label: "Dirección", name: "direccion", type: "text" },
                { label: "Ciudad Residencia", name: "ciudad_residencia", type: "text" },
                { label: "Departamento", name: "departamento", type: "text" }
            ]
        },
        {
            title: "Información Profesional",
            icon: <Briefcase className="h-5 w-5" />,
            cols: 2,
            fields: [
                { 
                    label: "Título Profesional", 
                    name: "titulo_profesional", 
                    type: "text",
                    info: "Ingrese el nombre completo del título obtenido al finalizar sus estudios"
                },
                { label: "Otorgado por", name: "otorgado_por", type: "text" },
                { label: "Fecha Graduación", name: "fecha_graduacion", type: "date" },
                { 
                    label: "Registro Profesional", 
                    name: "registro_profesional", 
                    type: "text",
                    info: "Número asignado en el RETHUS (Acto Administrativo)"
                },
                { 
                    label: "Especialización Practicada", 
                    name: "especializaciones", 
                    type: "select",
                    options: [
                        { value: "Anestesiólogo", label: "Anestesiólogo, Ginecobstetra, Ginecólogo" },
                        { value: "Especialista_en_Cirugía", label: "Especialista en Cirugía, Ortopedia, Urología, Oftalmología, Radiología" },
                        { value: "Médico_General", label: "Médico General, Otra Especialización" },
                        { value: "Odontología", label: "Odontología, Ortodoncia" }
                    ]
                },
                { 
                    label: "Actividad Principal", 
                    name: "actividad_principal", 
                    type: "select",
                    options: [
                        { value: "Asalariado", label: "Asalariado" },
                        { value: "Comerciante", label: "Comerciante" },
                        { value: "Empleado Público", label: "Empleado Público" },
                        { value: "Estudiante", label: "Estudiante" },
                        { value: "Hogar", label: "Hogar" },
                        { value: "Independiente", label: "Independiente" },
                        { value: "Inversionista", label: "Inversionista" },
                        { value: "Pensionado", label: "Pensionado" },
                        { value: "Rentista", label: "Rentista" },
                        { value: "Socio", label: "Socio" }
                    ]
                },
                { label: "Código CIIU", name: "codigo_ciiu", type: "text" },
                { 
                    label: "Sector y Tipo de Actividad", 
                    name: "sector_actividad", 
                    type: "select",
                    options: [
                        { value: "Agrícola", label: "Agrícola" },
                        { value: "Alimentos", label: "Alimentos" },
                        { value: "Campaña Política", label: "Campaña Política" },
                        { value: "Comercio", label: "Comercio" },
                        { value: "Construcción", label: "Construcción" },
                        { value: "Educación", label: "Educación" },
                        { value: "Farmacéutica", label: "Farmacéutica" },
                        { value: "Financiero", label: "Financiero" },
                        { value: "Industrial", label: "Industrial" },
                        { value: "Informática", label: "Informática" },
                        { value: "Metalmecánico", label: "Metalmecánico" },
                        { value: "Minero y Energético", label: "Minero y Energético" },
                        { value: "Petróleo", label: "Petróleo" },
                        { value: "Químico", label: "Químico" },
                        { value: "Salud", label: "Salud" },
                        { value: "Servicios", label: "Servicios" },
                        { value: "Servicios Financieros", label: "Servicios Financieros" },
                        { value: "Solidario", label: "Solidario" },
                        { value: "Telecomunicaciones", label: "Telecomunicaciones" },
                        { value: "Textiles", label: "Textiles" },
                        { value: "Transporte", label: "Transporte" },
                        { value: "Turismo", label: "Turismo" },
                        { value: "Otro", label: "Otro, ¿cuál?" }
                    ]
                },
                { label: "¿Cual?", name: "cual", type: "text" },
                { label: "Ocupación", name: "ocupacion", type: "text" },
                { label: "Cargo", name: "cargo", type: "text" }
            ]
        },
        {
            title: "Información Laboral",
            icon: <Building className="h-5 w-5" />,
            cols: 2,
            fields: [
                { label: "Empresa donde labora o trabajará", name: "empresa", type: "text" },
                { label: "Dirección Empresa", name: "direccion_empresa", type: "text" },
                { label: "Ciudad Empresa", name: "ciudad_empresa", type: "text" },
                { label: "Departamento Empresa", name: "departamento_empresa", type: "text" },
                { label: "Teléfono Empresa (Opcional)", name: "telefono_empresa", type: "phone" },
                { label: "¿QUE TIPO DE PRODUCTO Y/O SERVICIO COMERCIALIZA?", name: "producto_servicio", type: "text" },
                { 
                    label: "Ejercicio Privado Por Cuenta Propia", 
                    name: "ejercicio_privado", 
                    type: "radio",
                    options: [
                        { value: "SI", label: "SI" },
                        { value: "NO", label: "NO" }
                    ]
                },
                { 
                    label: "Ubicación del consultorio", 
                    name: "ubicacion_consultorio", 
                    type: "text",
                },
                { 
                    label: "Número y especialización médica o paramédica de los empleados", 
                    name: "Numero_especializacion", 
                    type: "text",
                },
                { 
                    label: "Posee Uno o Varios de los Siguientes Equipos", 
                    name: "", 
                    type: "checkbox",
                    options: [
                        { value: "equipo_radiografia", label: "Radiografía con fines de diagnóstico" },
                        { value: "equipo_rayos_x", label: "Equipos de rayos X para terapéutica" },
                        { value: "equipo_tomografia", label: "Equipos de tomografías por ordenador – Scanner" },
                        { value: "equipo_laser", label: "Equipos de generación de rayos láser" },
                        { value: "equipo_medicina_nuclear", label: "Equipos de medicina nuclear" }
                    ]
                },
                { 
                    label: "Existe la Posibilidad de Alojar a los Pacientes Durante Tratamiento", 
                    name: "alojar_pacientes", 
                    type: "radio",
                    options: [
                        { value: "SI", label: "SI" },
                        { value: "NO", label: "NO" }
                    ]
                },
                { 
                    label: "Tratamiento de Pacientes es Solo Ambulatorio", 
                    name: "tratamiento_ambulatorio", 
                    type: "radio",
                    options: [
                        { value: "SI", label: "SI" },
                        { value: "NO", label: "NO" }
                    ]
                },
                { 
                    label: "Existen Otros Riesgos (Laboratorios, Farmacias, etc.)", 
                    name: "otros_riesgos", 
                    type: "radio",
                    options: [
                        { value: "SI", label: "SI" },
                        { value: "NO", label: "NO" }
                    ]
                },
                { label: "Detalles Otros Riesgos", name: "detalles_otros_riesgos", type: "textarea" },
                { 
                    label: "Ejercicio de las Actividades Profesionales Exclusivamente en el Consultorio", 
                    name: "ejercicio_exclusivo", 
                    type: "radio",
                    options: [
                        { value: "SI", label: "SI" },
                        { value: "NO", label: "NO" }
                    ]
                },
                { 
                    label: "Prestación de Servicios Profesionales También en Otras Instituciones de Salud o Empresa", 
                    name: "prestacion_servicios", 
                    type: "radio",
                    options: [
                        { value: "SI", label: "SI" },
                        { value: "NO", label: "NO" }
                    ]
                },
                { label: "Nombre de la Institución", name: "nombre_institucion", type: "text" },
                { label: "Tipo de Servicios", name: "tipo_servicios", type: "text" },
                { label: "Función del Solicitante", name: "funcion_solicitante", type: "text" },
                { label: "Relación con la Institución", name: "relacion_institucion", type: "text" },
                { 
                    label: "Ejercicio profesional bajo relación laboral con una institución de salud", 
                    name: "ejercicio_laboral", 
                    type: "radio",
                    options: [
                        { value: "SI", label: "SI" },
                        { value: "NO", label: "NO" }
                    ]
                },
                { label: "Nombre y Descripción del Empleador", name: "nombre_empleador", type: "text" },
                { label: "Ubicación del Centro de Trabajo", name: "ubicacion_trabajo", type: "text" },
                { label: "Descripción de Labores", name: "descripcion_labores", type: "textarea" },
                { 
                    label: "Ejercicio de las actividades profesionales también en otras ocasiones", 
                    name: "ejercicio_otras_ocasiones", 
                    type: "radio",
                    options: [
                        { value: "SI", label: "SI" },
                        { value: "NO", label: "NO" }
                    ]
                },
                { label: "Detalles", name: "detalles_ejercicio_otras_ocasiones", type: "textarea" }
            ]
        },
        {
            title: "Información de Seguros y Reclamaciones",
            icon: <Stethoscope className="h-5 w-5" />,
            cols: 2,
            fields: [
                { 
                    label: "Ha tenido alguna reclamación de responsabilidad civil profesional durante los últimos cinco (5) años", 
                    name: "reclamacion_responsabilidad", 
                    type: "radio",
                    options: [
                        { value: "SI", label: "SI" },
                        { value: "NO", label: "NO" }
                    ]
                },
                { label: "Detalles", name: "detalles_reclamacion_responsabilidad", type: "textarea" },
                { 
                    label: "Tiene conocimiento de alguna circunstancia que pudiese comprometer su responsabilidad civil profesional", 
                    name: "circunstancia_responsabilidad", 
                    type: "radio",
                    options: [
                        { value: "SI", label: "SI" },
                        { value: "NO", label: "NO" }
                    ]
                },
                { label: "Detalles", name: "detalles_circunstancia_responsabilidad", type: "textarea" },
                { 
                    label: "¿Ha tenido contratados en los últimos cinco (5) años un seguro de responsabilidad civil profesional?", 
                    name: "seguro_responsabilidad", 
                    type: "radio",
                    options: [
                        { value: "SI", label: "Sí" },
                        { value: "NO", label: "No" }
                    ]
                },
                { label: "Compañía de Seguros", name: "compania_seguros", type: "text" },
                { label: "Vigencia de la Póliza", name: "vigencia_poliza", type: "date" },
                { label: "Límite Asegurado", name: "limite_asegurado", type: "currency" },
                { 
                    label: "Le ha sido rehusada o cancelada la póliza de responsabilidad civil profesional por alguna compañía de seguros", 
                    name: "rehusada_cancelada_poliza", 
                    type: "radio",
                    options: [
                        { value: "SI", label: "SI" },
                        { value: "NO", label: "NO" }
                    ]
                },
                { label: "Detalles", name: "detalles_rehusada_cancelada_poliza", type: "textarea" },
                { label: "Suma Asegurada Solicitada", name: "suma_asegurada", type: "currency" }
            ]
        },
        {
            title: "Información Financiera",
            icon: <CreditCard className="h-5 w-5" />,
            cols: 2,
            fields: [
                { label: "Ingresos Mensuales", name: "ingresos_mensuales", type: "currency" },
                { label: "Otros Ingresos", name: "otros_ingresos", type: "currency" },
                { label: "Concepto de Otros Ingresos", name: "concepto_otros_ingresos", type: "text" },
                { label: "Egresos Mensuales", name: "egresos_mensuales", type: "currency" },
                { label: "Activos", name: "activos", type: "currency" },
                { label: "Pasivos", name: "pasivos", type: "currency" },
                { label: "Patrimonio", name: "patrimonio", type: "currency" },
                { label: "Origen de fondos", name: "fondos", type: "text" }
            ]
        },
        {
            title: "Información Adicional",
            icon: <FileText className="h-5 w-5" />,
            fields: [
                { 
                    label: "¿Es usted una Persona Expuesta Políticamente (PEP)?", 
                    name: "persona_pep", 
                    type: "radio",
                    options: [
                        { value: "SI", label: "SI" },
                        { value: "NO", label: "NO" }
                    ]
                },
                { 
                    label: "¿Existe algún vínculo familiar, civil y/o asociación entre usted y una PEP?", 
                    name: "vinculo_pep", 
                    type: "radio",
                    options: [
                        { value: "SI", label: "SI" },
                        { value: "NO", label: "NO" }
                    ]
                },
                { 
                    label: "¿Por su cargo o actividad, administra recursos públicos?", 
                    name: "administra_recursos_publicos", 
                    type: "radio",
                    options: [
                        { value: "SI", label: "SI" },
                        { value: "NO", label: "NO" }
                    ]
                },
                { 
                    label: "¿Realiza operaciones internacionales?", 
                    name: "operaciones_internacionales", 
                    type: "radio",
                    options: [
                        { value: "SI", label: "SI" },
                        { value: "NO", label: "NO" }
                    ]
                },
                { label: "Indique", name: "detalles_operaciones_internacionales", type: "text" },
                { 
                    label: "¿Es usted sujeto de obligaciones tributarias en otro país o grupo de países?", 
                    name: "obligaciones_tributarias", 
                    type: "radio",
                    options: [
                        { value: "SI", label: "SI" },
                        { value: "NO", label: "NO" }
                    ]
                },
                { label: "Indique", name: "detalles_obligaciones_tributarias", type: "text" },
                { 
                    label: "¿Es responsable del RUT?", 
                    name: "responsable_rut", 
                    type: "radio",
                    options: [
                        { value: "SI", label: "SI" },
                        { value: "NO", label: "NO" }
                    ]
                },
                { label: "Código/s de Responsabilidad", name: "codigo_responsabilidad", type: "text" },
                { label: "Correo Electrónico registrado en la DIAN", name: "correo_dian", type: "email" },
                { 
                    label: "Autorizo expresa e inequívocamente a usar mis datos personales con fines comerciales", 
                    name: "autorizacion_datos", 
                    type: "radio",
                    options: [
                        { value: "SI", label: "SI" },
                        { value: "NO", label: "NO" }
                    ]
                },
                { label: "INTERMEDIARIO DE SEGUROS", name: "intermediario", type: "text" },
                { label: "Telefono", name: "intermediario_in", type: "text" },
                { label: "Direccion", name: "direccion_in", type: "text" }
            ]
        }
    ];

    const renderField = (field: FormField) => {
        switch (field.type) {
            case 'text':
            case 'email':
            case 'phone':
            case 'date':
                return (
                    <Input
                        type={field.type === 'date' ? 'date' : field.type === 'email' ? 'email' : 'text'}
                        value={data[field.name as keyof Formulario] as string || ''}
                        onChange={(e) => handleChange(field.name as keyof Formulario, e.target.value)}
                        className="w-full"
                    />
                );
            case 'currency':
                return (
                    <Input
                        type="text"
                        value={formatCurrency(data[field.name as keyof Formulario] as string || '')}
                        onChange={(e) => handleCurrencyChange(field.name as keyof Formulario, e.target.value)}
                        className="w-full"
                    />
                );
            case 'textarea':
                return (
                    <Textarea
                        value={data[field.name as keyof Formulario] as string || ''}
                        onChange={(e) => handleChange(field.name as keyof Formulario, e.target.value)}
                        className="w-full"
                    />
                );
            case 'select':
                return (
                    <Select
                        value={data[field.name as keyof Formulario] as string || ''}
                        onValueChange={(value) => handleChange(field.name as keyof Formulario, value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccione..." />
                        </SelectTrigger>
                        <SelectContent>
                            {field.options?.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            case 'checkbox':
                if (field.name === "") {
                    // Checkbox group for equipment
                    return (
                        <div className="space-y-2">
                            {field.options?.map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={option.value}
                                        checked={data[option.value as keyof Formulario] === 'SI'}
                                        onCheckedChange={(checked) => 
                                            handleCheckboxChange(option.value as keyof Formulario, checked as boolean)
                                        }
                                    />
                                    <Label htmlFor={option.value}>{option.label}</Label>
                                </div>
                            ))}
                        </div>
                    );
                } else {
                    return (
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id={field.name}
                                checked={data[field.name as keyof Formulario] === 'SI'}
                                onCheckedChange={(checked) => 
                                    handleCheckboxChange(field.name as keyof Formulario, checked as boolean)
                                }
                            />
                            <Label htmlFor={field.name}>{field.label}</Label>
                        </div>
                    );
                }
            case 'radio':
                return (
                    <RadioGroup
                        value={data[field.name as keyof Formulario] as string || ''}
                        onValueChange={(value: string) => handleRadioChange(field.name as keyof Formulario, value)}
                        className="flex gap-4"
                    >
                        {field.options?.map((option: { value: string; label: string }) => (
                            <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value} id={`${field.name}-${option.value}`} />
                                <Label htmlFor={`${field.name}-${option.value}`}>{option.label}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                );
            default:
                return (
                    <Input
                        type="text"
                        value={data[field.name as keyof Formulario] as string || ''}
                        onChange={(e) => handleChange(field.name as keyof Formulario, e.target.value)}
                        className="w-full"
                    />
                );
        }
    };

    return (
        <AppLayout>
        
            <div className="mb-2">
      <Button variant="ghost" size="sm" asChild>
        <Link href={`/formularios-medicos/${formulario.id}`}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          Volver al formulario
        </Link>
      </Button>
    </div>
            <Head title={`Editar Formulario Médico - ${formulario.id}`} />

            <div className="container mx-auto py-6 space-y-6">
                <form onSubmit={handleSubmit}>
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Editar Formulario #{formulario.id}</h1>
                            <p className="text-muted-foreground">
                                {formulario.primer_apellido} {formulario.segundo_apellido} {formulario.nombres}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" disabled={processing}>
                                <SaveIcon className="mr-2 h-4 w-4" />
                                Guardar Cambios
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
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Label htmlFor={field.name}>{field.label}</Label>
                                                    {field.info && (
                                                        <span className="text-sm text-muted-foreground">
                                                            <i className="bi bi-info-circle"></i>
                                                        </span>
                                                    )}
                                                </div>
                                                {renderField(field)}
                                                {errors[field.name as keyof typeof errors] && (
                                                    <p className="text-sm font-medium text-destructive">
                                                        {errors[field.name as keyof typeof errors]}
                                                    </p>
                                                )}
                                            </div>
                                            {fieldIndex < section.fields.length - 1 && (
                                                <Separator className="my-2" />
                                            )}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>


                </form>
            </div>
        </AppLayout>
    );
}
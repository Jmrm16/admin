<?php

namespace App\Http\Controllers;

use Illuminate\Http\request;
use setasign\Fpdi\Tcpdf\Fpdi;
use Carbon\Carbon;
use App\Models\FormulariosMedicos;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PDFController extends Controller
{

    public function verPDF($id)
{
    $formulario = FormulariosMedicos::findOrFail($id);

    $pdf = new Fpdi();
    $pdfPath = public_path('Formulario1.pdf');
    $especialidad = $formulario->especialidad;
    $pageCount = $pdf->setSourceFile($pdfPath);
    $pdf->SetMargins(0, 0, 0);
    $pdf->SetAutoPageBreak(false, 0);
    $pdf->setPrintHeader(false);
    $pdf->setPrintFooter(false);
    

    for ($pageNumber = 1; $pageNumber <= $pageCount; $pageNumber++) {
        $pdf->AddPage();
        $tplIdx = $pdf->importPage($pageNumber);
        $pdf->useTemplate($tplIdx, 0, 0, 210, 297, true);
        $pdf->SetFont('Helvetica', '', 8);
 

        // Rellenar datos desde $formulario como ya lo hacías con $request
        // Por ejemplo:
        if ($pageNumber == 1) {
// Información Personal - Versión corregida
$pdf->SetXY(37, 42.5);
$pdf->Cell(0, 10, $formulario->nombres.' '.$formulario->primer_apellido.' '.$formulario->segundo_apellido, 0, 0, '', false, 1);

$pdf->SetXY(14.5, 50);
$pdf->Cell(0, 10, $formulario->numero_identificacion, 0, 0, '', false, 1);

$pdf->SetXY(103, 50);
$pdf->Cell(0, 10, $formulario->direccion . ' - ' . $formulario->ciudad_residencia, 0, 0, '', false, 1);

$pdf->SetXY(14.15, 63);
$pdf->Cell(0, 10, $formulario->titulo_profesional, 0, 0, '', false, 1);

$pdf->SetXY(85, 63);
$pdf->Cell(0, 10, $formulario->otorgado_por, 0, 0, '', false, 1);

$pdf->SetXY(163.3, 63);
$pdf->Cell(0, 10, substr($formulario->fecha_graduacion,0,10), 0, 0, '', false, 1);



$pdf->SetXY(14.15, 70.5);
$pdf->Cell(0, 10, $formulario->numero_identificacion, 0, 0, '', false, 1);

$pdf->SetXY(100, 70.5);
$pdf->Cell(0, 10, $formulario->registro_profecional, 0, 0, '', false, 1);

$pdf->SetXY(40.15, 70.5);
$pdf->Cell(0, 10, $formulario->especializacion, 0, 0, '', false, 1);

$especialidad = $formulario->especializaciones ?? null; // nombre directo, no relación

$posicionesEspecializaciones = [
    "Anestesiólogo" => [60, 105.5],
    "Especialista_en_Cirugía" => [60, 109],
    "Médico_General" => [147.5, 105.5],
    "Odontología" => [147.5, 109],
];

if (isset($posicionesEspecializaciones[$especialidad])) {
    $pos = $posicionesEspecializaciones[$especialidad];
    $pdf->SetXY($pos[0], $pos[1]);
    $pdf->Cell(0, 10, "X", 0, 0, '', false, 1);
}

// Ejercicio privado - Versión corregida
$posiciones = [
    "SI" => [96, 121.5],
    "NO" => [96, 125.8],
];

$opcionSeleccionada = $formulario->ejercicio_privado;
foreach ($posiciones as $opcion => $pos) {
    $pdf->SetXY($pos[0], $pos[1]);
    if ($opcion === $opcionSeleccionada) {
        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
        if($opcionSeleccionada === "SI"){
            $pdf->SetXY(110.9, 128);
            $pdf->Cell(0, 10, $formulario->ubicacion_consultorio, 0, 0, '', false, 1);
            $pdf->SetXY(15.5, 135.5);
            $pdf->Cell(0, 10, $formulario->Numero_especialización, 0, 0, '', false, 1);
        }

    }
}

// Equipos médicos - Versión corregida
$posiciones = [
    "equipo_radiografia" => [55, 154.5],
    "equipo_rayos_x" => [55, 158],
    "equipo_tomografia" => [55, 161.7],
    "equipo_laser" => [131, 154.5],
    "equipo_medicina_nuclear" => [131, 158.7],
];

foreach ($posiciones as $campo => $pos) {
    $valor = $formulario->$campo ?? 'NO';
    $pdf->SetXY($pos[0], $pos[1]);
    $pdf->Cell(0, 10, $valor === 'SI' ? 'SI' : 'NO', 0, 0, '', false, 1);
}

// Resto de campos de la primera página - Versión corregida
$posiciones_alojar_pacientes = [
    "SI" => [70, 169.5],
    "NO" => [83.8, 169.5],
];

$opcionSeleccionada = $formulario->alojar_pacientes;
foreach ($posiciones_alojar_pacientes as $opcion => $pos) {
    $pdf->SetXY($pos[0], $pos[1]);
    if ($opcion === $opcionSeleccionada) {
        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
    }
}

$posiciones_tratamiento_ambulatorio = [
    "SI" => [169.5, 169.5],
    "NO" => [182.5, 169.5],
];

$opcionSeleccionada = $formulario->tratamiento_ambulatorio;
foreach ($posiciones_tratamiento_ambulatorio as $opcion => $pos) {
    $pdf->SetXY($pos[0], $pos[1]);
    if ($opcion === $opcionSeleccionada) {
        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
    }
}

$posiciones_otros_riesgos = [
    "SI" => [102, 176.5],
    "NO" => [116.5, 176.5],
];

$opcionSeleccionada = $formulario->otros_riesgos;
foreach ($posiciones_otros_riesgos as $opcion => $pos) {
    $pdf->SetXY($pos[0], $pos[1]);
    if ($opcion === $opcionSeleccionada) {
        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
        if($opcionSeleccionada === "SI"){
            $pdf->SetXY(15.5, 183.5);
            $pdf->Cell(0, 10, $formulario->detalles_otros_riesgos, 0, 0, '', false, 1);
        }
    }
}

$posiciones_ejercicio_exclusivo = [
    "SI" => [152.5, 196.3],
    "NO" => [166.5, 196.3],
];

$opcionSeleccionada_ejercicio = $formulario->ejercicio_exclusivo;
foreach ($posiciones_ejercicio_exclusivo as $opcion => $pos) {
    $pdf->SetXY($pos[0], $pos[1]);
    if ($opcion === $opcionSeleccionada_ejercicio) {
        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
    }
}

$posiciones_prestacion_servicios = [
    "SI" => [83, 205.5],
    "NO" => [96.5, 205.5],
];

$opcionSeleccionada_prestacion = $formulario->prestacion_servicios;
foreach ($posiciones_prestacion_servicios as $opcion => $pos) {
    $pdf->SetXY($pos[0], $pos[1]);
    if ($opcion === $opcionSeleccionada_prestacion) {
        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
        if($opcionSeleccionada_prestacion === "SI"){
            $pdf->SetXY(50.9, 218.5);
            $pdf->Cell(0, 10, $formulario->nombre_institucion, 0, 0, '', false, 1);
            $pdf->SetXY(40.3, 225.3);
            $pdf->Cell(0, 10, $formulario->tipo_servicios, 0, 0, '', false, 1);
            $pdf->SetXY(50.3, 232.3);
            $pdf->Cell(0, 10, $formulario->funcion_solicitante, 0, 0, '', false, 1);
            $pdf->SetXY(153, 232.3);
            $pdf->Cell(0, 10, $formulario->relacion_institucion, 0, 0, '', false, 1);
        }
    }
}

$posiciones_ejercicio_laboral = [
    "SI" => [130.5, 242.5],
    "NO" => [143.7, 242.5],
];

$opcionSeleccionada = $formulario->ejercicio_laboral;
foreach ($posiciones_ejercicio_laboral as $opcion => $pos) {
    $pdf->SetXY($pos[0], $pos[1]);
    if ($opcion === $opcionSeleccionada) {
        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
        if($opcionSeleccionada === "SI"){
            $pdf->SetXY(68.3, 250);
            $pdf->Cell(0, 10, $formulario->nombre_empleador, 0, 0, '', false, 1);
            $pdf->SetXY(63.19, 256.9);
            $pdf->Cell(0, 10, $formulario->ubicacion_trabajo, 0, 0, '', false, 1);
            $pdf->SetXY(119., 264);
            $pdf->Cell(0, 10, $formulario->descripcion_labores, 0, 0, '', false, 1);
        }
    }
}
}

// Agregar texto en la segunda página - Versión corregida
if ($pageNumber == 2) {
$posiciones_ejercicio_otras_ocasiones = [
    "SI" => [134.5, 15.3],
    "NO" => [147.8, 15.3],
];

$opcionSeleccionada = $formulario->ejercicio_otras_ocasiones;
foreach ($posiciones_ejercicio_otras_ocasiones as $opcion => $pos) {
    $pdf->SetXY($pos[0], $pos[1]);
    if ($opcion === $opcionSeleccionada) {
        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
        if($opcionSeleccionada === "SI"){
            $pdf->SetXY(62,23);
            $pdf->Cell(0, 10, $formulario->detalles_ejercicio_otras_ocasiones, 0, 1);
        }
    }
}

$posiciones_reclamacion_responsabilidad = [
    "SI" => [108.5, 68],
    "NO" => [122.7, 68],
];

$opcionSeleccionada = $formulario->reclamacion_responsabilidad;
foreach ($posiciones_reclamacion_responsabilidad as $opcion => $pos) {
    $pdf->SetXY($pos[0], $pos[1]);
    if ($opcion === $opcionSeleccionada) {
        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
        if($opcionSeleccionada === "SI"){
            $pdf->SetXY(61.7,76.5);
            $pdf->Cell(0, 10, $formulario->detalles_reclamacion_responsabilidad, 0, 1);
        }
    }
}

$posiciones_circunstancia_responsabilidad = [
    "SI" => [108.5, 115.5],
    "NO" => [122.7, 115.5],
];

$opcionSeleccionada = $formulario->circunstancia_responsabilidad;
foreach ($posiciones_circunstancia_responsabilidad as $opcion => $pos) {
    $pdf->SetXY($pos[0], $pos[1]);
    if ($opcion === $opcionSeleccionada) {
        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
        if($opcionSeleccionada === "SI"){
            $pdf->SetXY(61.5, 124);
            $pdf->Cell(0, 10, $formulario->detalles_circunstancia_responsabilidad, 0, 1);
        }
    }
}

$posiciones_seguro_responsabilidad = [
    "SI" => [108.5, 161.8],
    "NO" => [122.5, 161.8],
];

$opcionSeleccionada = $formulario->seguro_responsabilidad;
foreach ($posiciones_seguro_responsabilidad as $opcion => $pos) {
    $pdf->SetXY($pos[0], $pos[1]);
    if ($opcion === $opcionSeleccionada) {
        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
        if($opcionSeleccionada === "SI"){
            $pdf->SetXY(45.5, 170);
            $pdf->Cell(0, 10, $formulario->compania_seguros, 0, 0, '', false, 1);
            $pdf->SetXY(45.5, 176.9);
            $pdf->Cell(0, 10, $formulario->vigencia_poliza, 0, 0, '', false, 1);
            if (!empty($formulario->limite_asegurado)) {
                $limiteFormateado = '$' . number_format($formulario->limite_asegurado, 0, ',', '.');
                $pdf->SetXY(116.5, 176.9);
                $pdf->Cell(0, 10, $limiteFormateado, 0, 0, '', false, 1);
            }
        }
    }
}

$posiciones_rehusada_cancelada_poliza = [
    "SI" => [109, 193],
    "NO" => [123, 193],
];

$opcionSeleccionada = $formulario->rehusada_cancelada_poliza;
foreach ($posiciones_rehusada_cancelada_poliza as $opcion => $pos) {
    $pdf->SetXY($pos[0], $pos[1]);
    if ($opcion === $opcionSeleccionada) {
        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
        if($opcionSeleccionada === "SI"){
            $pdf->SetXY(61, 200.5);
            $pdf->Cell(0, 10, $formulario->detalles_rehusada_cancelada_poliza, 0, 1);
        }
    }
}




Carbon::setLocale('es');

$pdf->SetXY(16.19, 276.5);

$fecha = 'Fecha no válida';
if (!empty($formulario->fecha)) {
    try {
        $fechaCarbon = Carbon::parse($formulario->fecha); // usa el nombre correcto del campo
        $fecha = $fechaCarbon->translatedFormat('d \d\e F \d\e Y');
    } catch (\Exception $e) {
        $fecha = 'Error: ' . $e->getMessage();
    }
}

$texto = $formulario->ciudad_residencia . ' - ' . $fecha;
$pdf->SetFont('Helvetica', '', 10); // asegúrate de tener una fuente configurada
$pdf->Cell(0, 10, $texto, 0, 0, '', false, 1);



$valorFormateado = '$' . number_format($formulario->suma_asegurada, 0, ',', '.');

$pdf->SetXY(54, 230);
$pdf->Cell(0, 10, $valorFormateado, 0, 0, '', false, 1);

}

        // Repite para el resto de las páginas
    }

    return response()->stream(function () use ($pdf) {
        $pdf->Output('formulario.pdf', 'I');
    }, 200, [
        'Content-Type' => 'application/pdf',
        'Content-Disposition' => 'inline; filename="formulario.pdf"',
    ]);
}




    public function llenarPDF(Request $request)
    {
        $userId = Auth::id();
        $timestamp = now()->format('Ymd_His');
        $nombreArchivo = "formulario_{$userId}_{$timestamp}.pdf";
        $outputPath = storage_path("app/public/formularios/{$nombreArchivo}");
        $folderPath = storage_path('app/public/formularios');

        if (!file_exists($folderPath)) {
            mkdir($folderPath, 0777, true); // crea recursivamente la carpeta
        }


        // Crear PDF
        $pdfPath = public_path('Formulario1.pdf');
        $pdf = new Fpdi();
        $pageCount = $pdf->setSourceFile($pdfPath);
        // Configuración crítica para evitar artefactos
        $pdf->SetMargins(0, 0, 0);
        $pdf->SetAutoPageBreak(false, 0);
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);
        $pdf->SetFont('Helvetica', '', 8);
        $pdf->SetCreator('Your Application');
        $pdf->SetAuthor('Your Name');
        $pdf->SetTitle('Formulario Vinculado');

        // Obtener el número total de páginas del PDF original
        $pageCount = $pdf->setSourceFile($pdfPath);

        // Iterar sobre cada página del PDF
        for ($pageNumber = 1; $pageNumber <= $pageCount; $pageNumber++) {
            // Agregar una nueva página al PDF
            $pdf->AddPage();

            // Importar la página actual del PDF original con preservación de resolución
            $tplIdx = $pdf->importPage($pageNumber);
            $pdf->useTemplate($tplIdx, 0, 0, 210, 297, true);

            // Configurar fuente
            $pdf->SetFont('Helvetica', '', 8);

            // Agregar texto en la primera página
            if ($pageNumber == 1) {

                // Información Personal - Versión corregida
                $pdf->SetXY(37, 42.5);
                $pdf->Cell(0, 10, $request->nombres.' '.$request->primer_apellido.' '.$request->segundo_apellido, 0, 0, '', false, 1);

                $pdf->SetXY(14.5, 50);
                $pdf->Cell(0, 10, $request->numero_identificacion, 0, 0, '', false, 1);

                $pdf->SetXY(103, 50);
                $pdf->Cell(0, 10, $request->direccion . ' - ' . $request->ciudad_residencia, 0, 0, '', false, 1);
                
                $pdf->SetXY(14.15, 63);
                $pdf->Cell(0, 10, $request->titulo_profesional, 0, 0, '', false, 1);

                $pdf->SetXY(85, 63);
                $pdf->Cell(0, 10, $request->otorgado_por, 0, 0, '', false, 1);

                $pdf->SetXY(163.3, 63);
                $pdf->Cell(0, 10, $request->fecha_graduacion, 0, 0, '', false, 1);

                
                $pdf->SetXY(14.15, 70.5);
                $pdf->Cell(0, 10, $request->numero_identificacion, 0, 0, '', false, 1);

                $pdf->SetXY(100, 70.5);
                $pdf->Cell(0, 10, $request->registro_profecional, 0, 0, '', false, 1);
                
                $pdf->SetXY(40.15, 70.5);
                $pdf->Cell(0, 10, $request->especializacion, 0, 0, '', false, 1);

                // Especializaciones - Versión corregida
                $posicionesEspecializaciones = [
                    "Anestesiólogo" => [60, 105.5],
                    "Especialista_en_Cirugía" => [60, 109],
                    "Médico_General" => [147.5, 105.5],
                    "Odontología" => [147.5, 109],
                ];
                
                foreach ($posicionesEspecializaciones as $campo => $pos) {
                    if ($request->$campo === "SI") {
                        $pdf->SetXY($pos[0], $pos[1]);
                        $pdf->Cell(0, 10, "X", 0, 0, '', false, 1);
                    }
                }

                // Ejercicio privado - Versión corregida
                $posiciones = [
                    "SI" => [96, 121.5],
                    "NO" => [96, 125.8],
                ];

                $opcionSeleccionada = $request->ejercicio_privado;
                foreach ($posiciones as $opcion => $pos) {
                    $pdf->SetXY($pos[0], $pos[1]);
                    if ($opcion === $opcionSeleccionada) {
                        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
                        if($opcionSeleccionada === "SI"){
                            $pdf->SetXY(110.9, 128);
                            $pdf->Cell(0, 10, $request->ubicacion_consultorio, 0, 0, '', false, 1);
                            $pdf->SetXY(15.5, 135.5);
                            $pdf->Cell(0, 10, $request->Numero_especialización, 0, 0, '', false, 1);
                        }

                    }
                }

                // Equipos médicos - Versión corregida
                $posiciones = [
                    "equipo_radiografia" => [55, 154.5],
                    "equipo_rayos_x" => [55, 158],
                    "equipo_tomografia" => [55, 161.7],
                    "equipo_laser" => [131, 154.5],
                    "equipo_medicina_nuclear" => [131, 158.7],
                ];
                
                foreach ($posiciones as $campo => $pos) {
                    $valor = $request->$campo ?? 'NO';
                    $pdf->SetXY($pos[0], $pos[1]);
                    $pdf->Cell(0, 10, $valor === 'SI' ? 'SI' : 'NO', 0, 0, '', false, 1);
                }

                // Resto de campos de la primera página - Versión corregida
                $posiciones_alojar_pacientes = [
                    "SI" => [70, 169.5],
                    "NO" => [83.8, 169.5],
                ];

                $opcionSeleccionada = $request->alojar_pacientes;
                foreach ($posiciones_alojar_pacientes as $opcion => $pos) {
                    $pdf->SetXY($pos[0], $pos[1]);
                    if ($opcion === $opcionSeleccionada) {
                        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
                    }
                }

                $posiciones_tratamiento_ambulatorio = [
                    "SI" => [169.5, 169.5],
                    "NO" => [182.5, 169.5],
                ];

                $opcionSeleccionada = $request->tratamiento_ambulatorio;
                foreach ($posiciones_tratamiento_ambulatorio as $opcion => $pos) {
                    $pdf->SetXY($pos[0], $pos[1]);
                    if ($opcion === $opcionSeleccionada) {
                        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
                    }
                }

                $posiciones_otros_riesgos = [
                    "SI" => [102, 176.5],
                    "NO" => [116.5, 176.5],
                ];

                $opcionSeleccionada = $request->otros_riesgos;
                foreach ($posiciones_otros_riesgos as $opcion => $pos) {
                    $pdf->SetXY($pos[0], $pos[1]);
                    if ($opcion === $opcionSeleccionada) {
                        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
                        if($opcionSeleccionada === "SI"){
                            $pdf->SetXY(15.5, 183.5);
                            $pdf->Cell(0, 10, $request->detalles_otros_riesgos, 0, 0, '', false, 1);
                        }
                    }
                }

                $posiciones_ejercicio_exclusivo = [
                    "SI" => [152.5, 196.3],
                    "NO" => [166.5, 196.3],
                ];

                $opcionSeleccionada_ejercicio = $request->ejercicio_exclusivo;
                foreach ($posiciones_ejercicio_exclusivo as $opcion => $pos) {
                    $pdf->SetXY($pos[0], $pos[1]);
                    if ($opcion === $opcionSeleccionada_ejercicio) {
                        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
                    }
                }

                $posiciones_prestacion_servicios = [
                    "SI" => [83, 205.5],
                    "NO" => [96.5, 205.5],
                ];

                $opcionSeleccionada_prestacion = $request->prestacion_servicios;
                foreach ($posiciones_prestacion_servicios as $opcion => $pos) {
                    $pdf->SetXY($pos[0], $pos[1]);
                    if ($opcion === $opcionSeleccionada_prestacion) {
                        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
                        if($opcionSeleccionada_prestacion === "SI"){
                            $pdf->SetXY(50.9, 218.5);
                            $pdf->Cell(0, 10, $request->nombre_institucion, 0, 0, '', false, 1);
                            $pdf->SetXY(40.3, 225.3);
                            $pdf->Cell(0, 10, $request->tipo_servicios, 0, 0, '', false, 1);
                            $pdf->SetXY(50.3, 232.3);
                            $pdf->Cell(0, 10, $request->funcion_solicitante, 0, 0, '', false, 1);
                            $pdf->SetXY(153, 232.3);
                            $pdf->Cell(0, 10, $request->relacion_institucion, 0, 0, '', false, 1);
                        }
                    }
                }

                $posiciones_ejercicio_laboral = [
                    "SI" => [130.5, 242.5],
                    "NO" => [143.7, 242.5],
                ];

                $opcionSeleccionada = $request->ejercicio_laboral;
                foreach ($posiciones_ejercicio_laboral as $opcion => $pos) {
                    $pdf->SetXY($pos[0], $pos[1]);
                    if ($opcion === $opcionSeleccionada) {
                        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
                        if($opcionSeleccionada === "SI"){
                            $pdf->SetXY(68.3, 250);
                            $pdf->Cell(0, 10, $request->nombre_empleador, 0, 0, '', false, 1);
                            $pdf->SetXY(63.19, 256.9);
                            $pdf->Cell(0, 10, $request->ubicacion_trabajo, 0, 0, '', false, 1);
                            $pdf->SetXY(119., 264);
                            $pdf->Cell(0, 10, $request->descripcion_labores, 0, 0, '', false, 1);
                        }
                    }
                }
            }

            // Agregar texto en la segunda página - Versión corregida
            if ($pageNumber == 2) {
                $posiciones_ejercicio_otras_ocasiones = [
                    "SI" => [134.5, 15.3],
                    "NO" => [147.8, 15.3],
                ];

                $opcionSeleccionada = $request->ejercicio_otras_ocasiones;
                foreach ($posiciones_ejercicio_otras_ocasiones as $opcion => $pos) {
                    $pdf->SetXY($pos[0], $pos[1]);
                    if ($opcion === $opcionSeleccionada) {
                        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
                        if($opcionSeleccionada === "SI"){
                            $pdf->SetXY(62,23);
                            $pdf->Cell(0, 10, $request->detalles_ejercicio_otras_ocasiones, 0, 1);
                        }
                    }
                }

                $posiciones_reclamacion_responsabilidad = [
                    "SI" => [108.5, 68],
                    "NO" => [122.7, 68],
                ];

                $opcionSeleccionada = $request->reclamacion_responsabilidad;
                foreach ($posiciones_reclamacion_responsabilidad as $opcion => $pos) {
                    $pdf->SetXY($pos[0], $pos[1]);
                    if ($opcion === $opcionSeleccionada) {
                        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
                        if($opcionSeleccionada === "SI"){
                            $pdf->SetXY(61.7,76.5);
                            $pdf->Cell(0, 10, $request->detalles_reclamacion_responsabilidad, 0, 1);
                        }
                    }
                }

                $posiciones_circunstancia_responsabilidad = [
                    "SI" => [108.5, 115.5],
                    "NO" => [122.7, 115.5],
                ];

                $opcionSeleccionada = $request->circunstancia_responsabilidad;
                foreach ($posiciones_circunstancia_responsabilidad as $opcion => $pos) {
                    $pdf->SetXY($pos[0], $pos[1]);
                    if ($opcion === $opcionSeleccionada) {
                        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
                        if($opcionSeleccionada === "SI"){
                            $pdf->SetXY(61.5, 124);
                            $pdf->Cell(0, 10, $request->detalles_circunstancia_responsabilidad, 0, 1);
                        }
                    }
                }

                $posiciones_seguro_responsabilidad = [
                    "SI" => [108.5, 161.8],
                    "NO" => [122.5, 161.8],
                ];

                $opcionSeleccionada = $request->seguro_responsabilidad;
                foreach ($posiciones_seguro_responsabilidad as $opcion => $pos) {
                    $pdf->SetXY($pos[0], $pos[1]);
                    if ($opcion === $opcionSeleccionada) {
                        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
                        if($opcionSeleccionada === "SI"){
                            $pdf->SetXY(45.5, 170);
                            $pdf->Cell(0, 10, $request->compania_seguros, 0, 0, '', false, 1);
                            $pdf->SetXY(45.5, 176.9);
                            $pdf->Cell(0, 10, $request->vigencia_poliza, 0, 0, '', false, 1);
                            if (!empty($request->limite_asegurado)) {
                                $limiteFormateado = '$' . number_format($request->limite_asegurado, 0, ',', '.');
                                $pdf->SetXY(116.5, 176.9);
                                $pdf->Cell(0, 10, $limiteFormateado, 0, 0, '', false, 1);
                            }
                        }
                    }
                }


                
                
                $posiciones_rehusada_cancelada_poliza = [
                    "SI" => [109, 193],
                    "NO" => [123, 193],
                ];
                
 
                $opcionSeleccionada = $request->rehusada_cancelada_poliza;
                foreach ($posiciones_rehusada_cancelada_poliza as $opcion => $pos) {
                    $pdf->SetXY($pos[0], $pos[1]);
                    if ($opcion === $opcionSeleccionada) {
                        $pdf->Cell(40, 10, "X", 0, 0, '', false, 1);
                    }
                }

                $pdf->SetXY(61, 200.5);
                $pdf->Cell(0, 10, $request->detalles_rehusada_cancelada_poliza, 0, 1);
                
                

                Carbon::setLocale('es'); // Establecer el idioma a español
                
                $pdf->SetXY(16.19, 276.5);
                $fecha = Carbon::createFromFormat('Y-m-d', $request->fecha)->translatedFormat('d \d\e F \d\e Y');
                // Resultado: 11 de abril de 2025
                $texto = $request->ciudad_residencia . ' - ' . $fecha;
                $pdf->Cell(0, 10, $texto, 0, 0, '', false, 1);
                
                
                

                $valorFormateado = '$' . number_format($request->suma_asegurada, 0, ',', '.');

                $pdf->SetXY(54, 230);
                $pdf->Cell(0, 10, $valorFormateado, 0, 0, '', false, 1);
                
            }

            // Agregar texto en la tercera página
            if ($pageNumber == 3) {
                $pdf->SetXY(115, 43);
                $pdf->Cell(0, 10, $request->departamento, 0, 1);

                $pdf->SetXY(50, 70);
                $pdf->Cell(0, 10, $request->detalles_ejercicio_otras_ocasiones, 0, 1);

                $pdf->SetXY(50, 80);
                $pdf->Cell(0, 10, $request->reclamacion_responsabilidad, 0, 1);

                $pdf->SetXY(50, 90);
                $pdf->Cell(0, 10, $request->detalles_reclamacion_responsabilidad, 0, 1);

                $pdf->SetXY(50, 100);
                $pdf->Cell(0, 10, $request->circunstancia_responsabilidad, 0, 1);

                $pdf->SetXY(50, 110);
                $pdf->Cell(0, 10, $request->detalles_circunstancia_responsabilidad, 0, 1);

                $pdf->SetXY(50, 120);
                $pdf->Cell(0, 10, $request->seguro_responsabilidad, 0, 1);

                $pdf->SetXY(50, 130);
                $pdf->Cell(0, 10, $request->compania_seguros, 0, 1);

                $pdf->SetXY(50, 140);
                $pdf->Cell(0, 10, $request->vigencia_poliza, 0, 1);

                $pdf->SetXY(50, 150);
                $pdf->Cell(0, 10, $request->limite_asegurado, 0, 1);

                $pdf->SetXY(50, 160);
                $pdf->Cell(0, 10, $request->rehusada_cancelada_poliza, 0, 1);

                $pdf->SetXY(50, 170);
                $pdf->Cell(0, 10, $request->detalles_rehusada_cancelada_poliza, 0, 1);

                $pdf->SetXY(50, 180);
                $pdf->Cell(0, 10, $request->suma_asegurada, 0, 1);

                $pdf->SetXY(50, 190);
                $pdf->Cell(0, 10, $request->actividad_principal, 0, 1);

                $pdf->SetXY(50, 200);
                $pdf->Cell(0, 10, $request->codigo_ciiu, 0, 1);

                $pdf->SetXY(50, 210);
                $pdf->Cell(0, 10, $request->sector_actividad, 0, 1);



                $pdf->SetXY(50, 220);
                $pdf->Cell(0, 10, $request->ocupacion, 0, 1);

                $pdf->SetXY(50, 230);
                $pdf->Cell(0, 10, $request->cargo, 0, 1);

                $pdf->SetXY(50, 240);
                $pdf->Cell(0, 10, $request->empresa, 0, 1);

                $pdf->SetXY(50, 250);
                $pdf->Cell(0, 10, $request->direccion_empresa, 0, 1);

                $pdf->SetXY(50, 260);
                $pdf->Cell(0, 10, $request->ciudad_empresa, 0, 1);

                $pdf->SetXY(50, 270);
                $pdf->Cell(0, 10, $request->departamento_empresa, 0, 1);

                $pdf->SetXY(50, 280);
                $pdf->Cell(0, 10, $request->telefono_empresa, 0, 1);

                $pdf->SetXY(50, 290);
                $pdf->Cell(0, 10, $request->ingresos_mensuales, 0, 1);

                $pdf->SetXY(50, 300);
                $pdf->Cell(0, 10, $request->otros_ingresos, 0, 1);

                $pdf->SetXY(50, 310);
                $pdf->Cell(0, 10, $request->concepto_otros_ingresos, 0, 1);

                $pdf->SetXY(50, 320);
                $pdf->Cell(0, 10, $request->egresos_mensuales, 0, 1);

                $pdf->SetXY(50, 330);
                $pdf->Cell(0, 10, $request->activos, 0, 1);

                $pdf->SetXY(50, 340);
                $pdf->Cell(0, 10, $request->pasivos, 0, 1);

                $pdf->SetXY(50, 350);
                $pdf->Cell(0, 10, $request->patrimonio, 0, 1);

                $pdf->SetXY(50, 360);
                $pdf->Cell(0, 10, $request->pep, 0, 1);

                $pdf->SetXY(50, 370);
                $pdf->Cell(0, 10, $request->vinculo_pep, 0, 1);

                $pdf->SetXY(50, 380);
                $pdf->Cell(0, 10, $request->administra_recursos_publicos, 0, 1);

                $pdf->SetXY(50, 390);
                $pdf->Cell(0, 10, $request->operaciones_internacionales, 0, 1);

                $pdf->SetXY(50, 400);
                $pdf->Cell(0, 10, $request->detalles_operaciones_internacionales, 0, 1);

                $pdf->SetXY(50, 410);
                $pdf->Cell(0, 10, $request->obligaciones_tributarias, 0, 1);

                $pdf->SetXY(50, 420);
                $pdf->Cell(0, 10, $request->detalles_obligaciones_tributarias, 0, 1);

                $pdf->SetXY(50, 430);
                $pdf->Cell(0, 10, $request->responsable_rut, 0, 1);

                $pdf->SetXY(50, 440);
                $pdf->Cell(0, 10, $request->codigo_responsabilidad, 0, 1);

                $pdf->SetXY(50, 450);
                $pdf->Cell(0, 10, $request->correo_dian, 0, 1);

                $pdf->SetXY(50, 460);
                $pdf->Cell(0, 10, $request->autorizacion_datos, 0, 1);

                 // Fecha
                $pdf->SetXY(105, 22);
                $fecha = Carbon::createFromFormat('Y-m-d', $request->fecha)->format('d  m Y');
                $pdf->Cell(0, 10, $fecha, 0, 1);
                
                // Ciudad
                $pdf->SetXY(80, 26);
                $pdf->Cell(0, 10, $request->ciudad, 0, 1);
                
                // Sucursal
                $pdf->SetXY(82, 30);
                $pdf->Cell(0, 10, $request->sucursal, 0, 1);
                
                // Tipo de Solicitud
                $pdf->SetXY(91.8, 34.7);
                $pdf->Cell(0, 10, $request->tipo_solicitud, 0, 1);
                $pdf->SetXY(50, 140);
                $pdf->Cell(0, 10, $request->tipo_documento, 0, 1);
                
                $pdf->SetXY(50, 160);
                $pdf->Cell(0, 10, $request->fecha_expedicion, 0, 1);
                
                $pdf->SetXY(50, 170);
                $pdf->Cell(0, 10, $request->lugar_expedicion, 0, 1);
                
                $pdf->SetXY(50, 180);
                $pdf->Cell(0, 10, $request->fecha_nacimiento, 0, 1);
                
                $pdf->SetXY(50, 190);
                $pdf->Cell(0, 10, $request->lugar_nacimiento, 0, 1);
                
                $pdf->SetXY(50, 200);
                $pdf->Cell(0, 10, $request->nacionalidad_1, 0, 1);
                
                $pdf->SetXY(50, 210);
                $pdf->Cell(0, 10, $request->nacionalidad_2, 0, 1);
                
                $pdf->SetXY(50, 220);
                $pdf->Cell(0, 10, $request->email, 0, 1);
                
                $pdf->SetXY(50, 230);
                $pdf->Cell(0, 10, $request->celular, 0, 1);
            }
        }


// Guardar el PDF generado en storage/app/public/formularios
$pdf->Output($outputPath, 'F');

// Guardar los datos en la base de datos
$data = $request->all();
$data['user_id'] = Auth::id();
$data['pdf_path'] = "formularios/{$nombreArchivo}";
FormulariosMedicos::create($data);

return redirect()->route('dashboard')->with('success', 'Formulario generado y guardado correctamente.');

    }

    
    public function llenarPDF2($id)
    {
        $formulario = FormulariosMedicos::findOrFail($id);

        $pdf = new Fpdi();
        $pdfPath = public_path('Formulario2.pdf');
        $pageCount = $pdf->setSourceFile($pdfPath);
        $pdf->SetMargins(0, 0, 0);
        $pdf->SetAutoPageBreak(false, 0);
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);
        


         // Obtener el número total de páginas del PDF original
         $pageCount = $pdf->setSourceFile($pdfPath);

                // Iterar sobre cada página del PDF
                for ($pageNumber = 1; $pageNumber <= $pageCount; $pageNumber++) {
                    $pdf->AddPage();
                    $tplIdx = $pdf->importPage($pageNumber);
                    $pdf->useTemplate($tplIdx, 0, 0, 210, 297, true);
                    $pdf->SetFont('Helvetica', '', 8);
             
        
                    // Agregar texto en la primera página
                    if ($pageNumber == 1) {



                // Clase de Vinculación - Versión corregida
                $opcionSeleccionada = $formulario->clase_vinculacion;
                $otroTexto = $formulario->otro_clase_vinculacion ?? '';
                $posiciones = [
                    "TOMADOR" => [47.9, 34.5],
                    "ASEGURADO" => [115.06, 36.01],
                    "BENEFICIARIO" => [115.06, 36.01],
                    "AFIANZADO" => [115.06, 36.01],
                    "PROVEEDOR" => [115.06, 36.01],
                    "INTERMEDIARIO" => [115.06, 36.01],
                    "OTRO" => [115.06, 36.01],
                ];

                foreach ($posiciones as $opcion => $pos) {
                    $pdf->SetFont('dejavusans', '', 9);
                    $pdf->SetXY($pos[0], $pos[1]);
                    if ($opcion === $opcionSeleccionada) {
                        $pdf->Cell(40, 10, '●', 0, 0, '', false, 1);
                    }
                    if ($opcionSeleccionada === "OTRO") {
                        $pdf->SetXY(180, 100);
                        $pdf->Cell(40, 10, $otroTexto, 0, 0, '', false, 1);
                    }
                }
                

                Carbon::setLocale('es');

                $pdf->SetXY(33.19, 25);
                
                $fecha = 'Fecha no válida';
                if (!empty($formulario->fecha)) {
                    try {
                        $fechaCarbon = Carbon::parse($formulario->fecha); // usa el nombre correcto del campo
                        $fecha = $fechaCarbon->translatedFormat('d \d\e F \d\e Y');
                    } catch (\Exception $e) {
                        $fecha = 'Error: ' . $e->getMessage();
                    }
                }
                
                $pdf->SetFont('Helvetica', '', 10); // asegúrate de tener una fuente configurada
                $pdf->Cell(0, 10, $fecha, 0, 0, '', false, 1);
                

                $pdf->SetXY(77, 25);
                $pdf->Cell(0, 10, $formulario->ciudad, 0, 1);

                $pdf->SetXY(118, 25);
                $pdf->Cell(0, 10, $formulario->sucursal, 0, 1);

                $pdf->SetXY(167, 25);
                $pdf->Cell(0, 10, $formulario->tipo_solicitud, 0, 1);

                $pdf->SetXY(30, 46.8);
                $pdf->Cell(0, 10, $formulario->primer_apellido, 0, 1);
                $pdf->SetXY(80, 46.8);
                $pdf->Cell(0, 10, $formulario->segundo_apellido, 0, 1);
                $pdf->SetXY(120, 46.8);
                $pdf->Cell(0, 10, $formulario->nombres, 0, 1);
                $pdf->SetXY(178, 46.8);
                $pdf->Cell(0, 10, $formulario->tipo_documento, 0, 1);
                $pdf->SetXY(19, 53.5);
                $pdf->Cell(0, 10, $formulario->numero_identificacion, 0, 0, '', false, 1);
                $pdf->SetXY(73.5, 53.5);
                $pdf->Cell(0, 10, substr($formulario->fecha_expedicion, 0, 10), 0, 0, '', false, 1);
                $pdf->SetXY(117, 53.5);
                $pdf->Cell(0, 10, $formulario->lugar_expedicion, 0, 0, '', false, 1);
                $pdf->SetXY(180, 53.5);
                $pdf->Cell(0, 10, substr($formulario->fecha_nacimiento,0,10), 0, 0, '', false, 1);
                $pdf->SetXY(27.15, 60.5);
                $pdf->Cell(0, 10, $formulario->nacionalidad_1, 0, 0, '', false, 1);
                $pdf->SetXY(92, 60.5);
                $pdf->Cell(0, 10, $formulario->nacionalidad_2, 0, 0, '', false, 1);
                $pdf->SetXY(150, 60.5);
                $pdf->Cell(0, 10, $formulario->email, 0, 0, '', false, 1);

                $pdf->SetXY(32, 67);
                $pdf->Cell(0, 10, $formulario->lugar_nacimiento, 0, 0, '', false, 1);
                $pdf->SetXY(105, 67);
                $pdf->Cell(0, 10, $formulario->celular, 0, 0, '', false, 1);
                $pdf->SetXY(158, 67);
                $pdf->Cell(0, 10, $formulario->direccion . ' - ' . $formulario->ciudad_residencia, 0, 0, '', false, 1);

                $pdf->SetXY(20, 74);
                $pdf->Cell(0, 10, $formulario->ciudad_residencia, 0, 0, '', false, 1);
                $pdf->SetXY(68, 74);
                $pdf->Cell(0, 10, $formulario->departamento, 0, 0, '', false, 1);
                $pdf->SetXY(125, 74);
                $pdf->Cell(0, 10, $formulario->actividad_principal, 0, 0, '', false, 1);

                $pdf->SetXY(179, 74);
                $pdf->Cell(0, 10, $formulario->codigo_ciiu, 0, 0, '', false, 1);

                $pdf->SetXY(38, 82);
                $pdf->Cell(0, 10, $formulario->sector_actividad, 0, 0, '', false, 1);

                $pdf->SetXY(82, 82);
                $pdf->Cell(0, 10, $formulario->cual, 0, 0, '', false, 1);

                $pdf->SetXY(135, 82);
                $pdf->Cell(0, 10, $formulario->ocupacion, 0, 0, '', false, 1);
                $pdf->SetXY(172, 82);
                $pdf->Cell(0, 10, $formulario->cargo, 0, 0, '', false, 1);
                $pdf->SetXY(20, 88);
                $pdf->Cell(0, 10, $formulario->empresa, 0, 0, '', false, 1);
                $pdf->SetXY(70, 88);
                $pdf->Cell(0, 10, $formulario->direccion_empresa, 0, 0, '', false, 1);
                $pdf->SetXY(121, 88);
                $pdf->Cell(0, 10, $formulario->ciudad_empresa, 0, 0, '', false, 1);
                $pdf->SetXY(167, 88);
                $pdf->Cell(0, 10, $formulario->departamento_empresa, 0, 0, '', false, 1);


                $pdf->SetXY(28, 95);
                $pdf->Cell(0, 10, $formulario->telefono_empresa, 0, 0, '', false, 1);
                function parseMoneda($valor)
               {
               return '$' . number_format((int) preg_replace('/[^0-9]/', '', $valor), 0, ',', '.');
               }
               $ingresos = parseMoneda($formulario->ingresos_mensuales);
               $otros = parseMoneda($formulario->otros_ingresos);
               $egresos = parseMoneda($formulario->egresos_mensuales);
               $activos = parseMoneda($formulario->activos);
               $pasivos = parseMoneda($formulario->pasivos);
               $patrimonio = parseMoneda($formulario->patrimonio);

               $pdf->SetXY(146, 102); 
               $pdf->Cell(0, 10, '' . $ingresos, 0, 1);

               $pdf->SetXY(146, 109);
               $pdf->Cell(0, 10, '' . $otros, 0, 1);

               $pdf->SetXY(146, 116);
               $pdf->Cell(0, 10, '' . $egresos, 0, 1);

              $pdf->SetXY(50, 102);
              $pdf->Cell(0, 10, '' . $activos, 0, 1);

              $pdf->SetXY(50, 109);
              $pdf->Cell(0, 10, '' . $pasivos, 0, 1);

              $pdf->SetXY(50, 116);
              $pdf->Cell(0, 10, '' . $patrimonio, 0, 1);

              $pdf->SetXY(50, 123);
              $pdf->Cell(0, 10, $formulario->concepto_otros_ingresos, 0, 0, '', false, 1);


            // personapep
if ($formulario->persona_pep === 'SI') {
    $pdf->SetFont('dejavusans', '', 10);
    $pdf->SetXY(83.3, 129.6); // Coordenada SI
    $pdf->Cell(0, 10, '●', 0, 0);
} elseif ($formulario->persona_pep === 'NO') {
    $pdf->SetFont('dejavusans', '', 10);
    $pdf->SetXY(93.7, 129.6); // Coordenada NO
    $pdf->Cell(0, 10, '●', 0, 0);
}


              // Vínculo PEP
if ($formulario->vinculo_pep === 'SI') {
    $pdf->SetFont('dejavusans', '', 10);
    $pdf->SetXY(179.4, 129.6); // Coordenada SI
    $pdf->Cell(0, 10, '●', 0, 0);
} elseif ($formulario->vinculo_pep === 'NO') {
    $pdf->SetFont('dejavusans', '', 10);
    $pdf->SetXY(189.9, 129.6); // Coordenada NO
    $pdf->Cell(0, 10, '●', 0, 0);
}

// Administra recursos públicos
if ($formulario->administra_recursos_publicos === 'SI') {
    $pdf->SetFont('dejavusans', '', 10);
    $pdf->SetXY(67.1, 142.4);
    $pdf->Cell(0, 10, '●', 0, 0);
} elseif ($formulario->administra_recursos_publicos === 'NO') {
    $pdf->SetFont('dejavusans', '', 10);
    $pdf->SetXY(77.5, 142.4);
    $pdf->Cell(0, 10, '●', 0, 0);
}

// Operaciones internacionales
if ($formulario->operaciones_internacionales === 'SI') {
    $pdf->SetFont('dejavusans', '', 10);
    $pdf->SetXY(128.2, 142.4);
    $pdf->Cell(0, 10, '●', 0, 0);
    $pdf->SetFont('Helvetica', '', 8);
    $pdf->SetXY(161, 145.4);
    $pdf->MultiCell(0, 5,   $formulario->detalles_operaciones_internacionales, 0, 'L');
} elseif ($formulario->operaciones_internacionales === 'NO') {
    $pdf->SetFont('dejavusans', '', 10);
    $pdf->SetXY(138.5, 142.4);
    $pdf->Cell(0, 10, '●', 0, 0);
}

// Obligaciones tributarias
if ($formulario->obligaciones_tributarias === 'SI') {
    $pdf->SetFont('dejavusans', '', 10);
    $pdf->SetXY(110, 148.2);
    $pdf->Cell(0, 10, '●', 0, 0);
    $pdf->SetFont('Helvetica', '', 8);
    $pdf->SetXY(142, 152);
    $pdf->MultiCell(0, 5, $formulario->detalles_obligaciones_tributarias, 0, 'L');
} elseif ($formulario->obligaciones_tributarias === 'NO') {
    $pdf->SetFont('dejavusans', '', 9);
    $pdf->SetXY(120.5, 148.2);
    $pdf->Cell(0, 10, '●', 0, 0);
}

// Responsable del RUT
if ($formulario->responsable_rut === 'SI') {
    $pdf->SetFont('dejavusans', '', 10);
    $pdf->SetXY(36.6, 155);
    $pdf->Cell(0, 10, '●', 0, 0);
    $pdf->SetFont('Helvetica', '', 8);
    $pdf->SetXY(100, 160);
    $pdf->MultiCell(0, 5,  $formulario->codigo_responsabilidad, 0, 'L');
    $pdf->SetXY(95, 165);
    $pdf->MultiCell(0, 5,  $formulario->correo_dian, 0, 'L');
} elseif ($formulario->responsable_rut === 'NO') {
    $pdf->SetFont('dejavusans', '', 10);
    $pdf->SetXY(47 , 155);
    $pdf->Cell(0, 10, '●', 0, 0);
}


$pdf->SetFont('Helvetica', '', 8);    
        
$pdf->SetXY(35, 216);
$pdf->Cell(0, 10, $formulario->fondos, 0, 0, '', false, 1);    
$pdf->SetXY(134, 265.5);          
                }
        
                    // Agregar texto en la segunda página - Versión corregida
                    if ($pageNumber == 2) {       
                        // Autorización datos
if ($formulario->autorizacion_datos === 'SI') {
    $pdf->SetFont('dejavusans', '', 9);
    $pdf->SetXY(43, 280.7);
    $pdf->Cell(0, 10, '●', 0, 0);
} elseif ($formulario->autorizacion_datos === 'NO') {
    $pdf->SetFont('dejavusans', '', 9);
    $pdf->SetXY(53.2, 280.7);
    $pdf->Cell(0, 10, '●', 0, 0);
}  
$pdf->SetFont('Helvetica', '', 8);    
        
                        $pdf->SetXY(90, 260.5);
                        $pdf->Cell(0, 10, $formulario->intermediario, 0, 0, '', false, 1);    
                        $pdf->SetXY(134, 265.5);
                        $pdf->Cell(0, 10, $formulario->intermediario_in, 0, 0, '', false, 1);
                        $pdf->SetXY(22.5, 265.5);
                        $pdf->Cell(0, 10, $formulario->direccion_in, 0, 0, '', false, 1);       
                    }
                    // Agregar texto en la tercera página
                    if ($pageNumber == 3) {
                        if ($formulario->autorizacion_datos === 'SI') {
                            $pdf->SetFont('dejavusans', '', 9);
                            $pdf->SetXY(59.3, 151.7);
                            $pdf->Cell(0, 10, '●', 0, 0);
                        } elseif ($formulario->autorizacion_datos === 'NO') {
                            $pdf->SetFont('dejavusans', '', 9);
                            $pdf->SetXY(69.3, 151.7);
                            $pdf->Cell(0, 10, '●', 0, 0);
                        }  


                    }
                }

                return response()->stream(function () use ($pdf) {
                    $pdf->Output('formulario.pdf', 'I');
                }, 200, [
                    'Content-Type' => 'application/pdf',
                    'Content-Disposition' => 'inline; filename="formulario.pdf"',
                ]);




    }


}

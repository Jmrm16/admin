<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ObservacionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'contenido' => $this->contenido,
            'fase' => $this->fase,
            'estado' => $this->estado,
            'creado_en' => $this->created_at->diffForHumans(),
            'creado_por' => [
                'id' => $this->creadoPor->id,
                'name' => $this->creadoPor->name,
            ],
        ];
    }
}

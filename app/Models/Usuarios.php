<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;



class Usuarios extends Model
{
    protected $table = 'users';


    // app/Models/User.php

public function formulariosMedicos()
{
    return $this->hasMany(FormulariosMedicos::class);  // Si un usuario puede tener varios formularios médicos
}

}


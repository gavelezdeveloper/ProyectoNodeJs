'use stric'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MaestrosSchema = Schema({

    n_id: { type: Number, require: true, unique: true },
    nombre: { type: String, require: true },
    materia: { type: String, require: true },
    especialidad: { type: String, require: true },
    cod_grupo: { type: String, require: true},
    nacionalidad: { type: String, require: true },
  
  });

module.exports = mongoose.model('maestros', MaestrosSchema);
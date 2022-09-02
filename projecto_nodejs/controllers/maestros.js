'use strict'

const { validationResult } = require('express-validator');

var Maestros = require('../models/maestros');

var controller = {
    maestros: function(req, res){
        
        Maestros.find({}).exec( (err, maestros) =>{
            if(err) return res.status(500).json({status: 500,mensaje: err});
            if(!maestros) return res.status(200).json({status: 200,mensaje: "No hay maestros por listar."});

            return res.status(200).json({
                status: 200,
                data: maestros
            });

        });

    },

    maestro: function(req, res){
        
        let n_lista = req.params.n_lista;

        Maestros.findOne({n_cuenta: n_lista}).exec( (err, maestro) =>{
            if(err) return res.status(500).json({status: 500,mensaje: err});
            if(!maestro) return res.status(200).json({status: 200,mensaje: "No se encontro el maestro."});

            return res.status(200).json({
                status: 200,
                data: maestro
            });

        });

    },

    crear_maestro: function(req, res){

        //Validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        let user_info = req.body;


        Maestros.findOne({n_id: user_info.n_id}).exec( (err, maestro) =>{
            if(err) return res.status(500).json({status: 500,mensaje: err});
            if(maestro) return res.status(200).json({status: 200,mensaje: "El Maestro ya existe."});
        
            let maestros_model = new Maestros();

            maestros_model.n_id = user_info.n_id;
            maestros_model.nombre = user_info.nombre;
            maestros_model.materia = user_info.materia;
            maestros_model.especialidad = user_info.especialidad;
            maestros_model.cod_grupo = user_info.cod_grupo;
            maestros_model.nacionalidad = user_info.nacionalidad;


            maestros_model.save((err, maestroStored) => {
                if(err) return res.status(500).json({status: 500,mensaje: err});
                if(!maestroStored) return res.status(200).json({status: 200,mensaje: "No se logro almancenar el maestro."});
            });

            return res.status(200).json({
                status: 200,
                menssage: "Usuario almacenado." 
            });
        
        });

    },

    update_maestro: function(req, res) {
        //Validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        let n_id = req.params.n_id;
        let user_info = req.body;

        let maestro_info_update = {
            nombre: user_info.nombre, 
            materia: user_info.materia, 
            especialidad: user_info.especialidad,
            cod_grupo: user_info.cod_grupo,
            nacionalidad: user_info.nacionalidad

        };

        Maestros.findOneAndUpdate({n_id: n_id}, maestro_info_update, {new:true}, (err, maestroUpdate) => {
            if(err) return res.status(500).json({message: 'Error al actualizar.'});
            if(!maestroUpdate) return res.status(404).json({message: 'No existe el maestro.'});


            console.log(maestroUpdate);

            return res.status(200).json({
                data: maestro_info_update
            });


        });

        
        
    },

    
    delete_maestro: function(req, res) {

        let n_lista = req.params.n_lista;

        Maestros.findOneAndRemove({n_cuenta: n_lista}, (err, maestroDelete) => {
            if(err) return res.status(500).json({message: 'Error al eliminar.'});
            if(!maestroDelete) return res.status(404).json({message: 'No existe el maestro.'});

            return res.status(200).json({
                message: "Usuario eliminado."
            });

        });

    }
    

};
module.exports = controller;
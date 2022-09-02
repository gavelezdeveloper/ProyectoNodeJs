'use strict'
const express = require('express');
const api = express.Router();
const { body } = require('express-validator');

var WelcomeController = require('../controllers/welcome');
var AlumnosController = require('../controllers/alumnos');
let AuthController = require('../controllers/auth');

var MaestrosController = require('../controllers/maestros');

let userProtectUrl = require('../middlewares/authUser').userProtectUrl;


// CRUD de Alumnos
api.get("/", WelcomeController.welcome);
api.get("/alumnos", userProtectUrl, AlumnosController.alumnos);
api.get("/alumno/:n_lista", userProtectUrl, AlumnosController.alumno);
api.post("/alumno", userProtectUrl, [
    body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.crear_alumno);

api.put("/alumno/:n_lista", userProtectUrl,[
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.update_alumno);

api.delete("/alumno/:n_lista", userProtectUrl, AlumnosController.delete_alumno);

api.post("/login",[
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty()
], AuthController.login);
api.post("/logout", userProtectUrl, AuthController.logout);


// Crud de Maestros
api.get("/maestros", MaestrosController.maestros);
api.get("/maestro/:n_id", MaestrosController.maestro);
api.post("/maestro", userProtectUrl, [
    body('n_id').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('materia').not().isEmpty(),
    body('especialidad').not().isEmpty(),
    body('cod_grupo').not().isEmpty(),
    body('nacionalidad').not().isEmpty()

], MaestrosController.crear_maestro);

api.put("/maestro/:n_id",[
    body('nombre').not().isEmpty(),
    body('materia').not().isEmpty(),
    body('especialidad').not().isEmpty(),
    body('cod_grupo').not().isEmpty(),
    body('nacionalidad').not().isEmpty()
], MaestrosController.update_maestro);

api.delete("/maestro/:n_id", MaestrosController.delete_maestro);

module.exports = api;

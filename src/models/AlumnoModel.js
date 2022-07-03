'use strict'
var conexionBD = require('../../config/conexionBD')

var Alumno = function (alumno) {
  this.nombre_alumno = alumno.nombre_alumno
  this.anotacion_alumno = alumno.anotacion_alumno
  this.curso_alumno = alumno.curso_alumno
  this.fecha_anotacion = alumno.fecha_anotacion
}
//Crear
Alumno.create = function (nuevoAlumno, resultado) {
  conexionBD.query("INSERT INTO alumnos SET ?", nuevoAlumno, function (error, respuesta) {
    if (error) {
      console.log("Error: ", error)
      resultado(error, null)
    }
    else {
      console.log(respuesta.insertId)
      resultado(null, respuesta.insertId)
    }
  })
}
//Buscar por parametro
Alumno.findById = function (id, resultado) {
  console.log(id)
  conexionBD.query("SELECT * FROM alumnos WHERE id = ? ", id, function (error, respuesta) {
    if (error) {
      console.log("Error: ", error)
      resultado(error, null)
    }
    else {
      resultado(null, respuesta)
    }
  })
}
//Listar todos
Alumno.findAll = function (resultado) {
  conexionBD.query("SELECT * FROM alumnos", function (error, respuesta) {
    if (error) {
      console.log("Error: ", error)
      resultado(null, error)
    }
    else {
      console.log('Alumnos : ', respuesta)
      resultado(null, respuesta)
    }
  })
}
//Actualizar
Alumno.update = function (id, alumno, resultado) {
  console.log(id)
  conexionBD.query("UPDATE alumnos SET nombre_alumno=?, anotacion_alumno=?, curso_alumno=?, fecha_anotacion=?  WHERE id = ?", [alumno.nombre_alumno, alumno.anotacion_alumno, alumno.curso_alumno, alumno.fecha_anotacion, id], function (error, respuesta) {
    if (error) {
      console.log("Error: ", error)
      resultado(null, error)
    } else {
      resultado(null, respuesta)
    }
  })
}
//Eliminar
Alumno.delete = function (id, resultado) {
  console.log(id)
  conexionBD.query("DELETE FROM alumnos WHERE id = ?", id, function (error, respuesta) {
    if (error) {
      console.log("Error: ", error)
      resultado(null, error)
    }
    else {
      resultado(null, respuesta)
    }
  })
}

module.exports = Alumno
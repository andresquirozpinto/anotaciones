'use strict'
const Alumno = require('../models/AlumnoModel')
exports.findAll = function (req, res) {
  Alumno.findAll(function (err, alumno) {
    console.log('controller')
    if (err)
      res.send(err)
    console.log('res', alumno)
    res.send(alumno)
  })
}

exports.create = function (req, res) {
  const nuevo_alumno = new Alumno(req.body)
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Error al guardar.' })
  } else {
    Alumno.create(nuevo_alumno, function (err, alumno) {
      if (err)
        res.send(err);
      res.json({ error: false, message: "Alumno agregado correctamente!", data: alumno })
    })
  }
}

exports.findByNombre = function (req, res) {
  console.log(req)
  Alumno.findByNombre(req.params.nombre_alumno, function (err, alumno) {
    if (err)
      res.send(err)
    res.json(alumno)
  })
}

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Error al actualizar.' })
  } else {
    Alumno.update(req.params.id, new Alumno(req.body), function (err, alumno) {
      if (err)
        res.send(err);
      res.json({ error: false, message: 'Actualizado correctamente!' })
    })
  }
}

exports.delete = function (req, res) {
  Alumno.delete(req.params.id, function (err, alumno) {
    if (err)
      res.send(err)
    res.json({ error: false, message: 'Alumno eliminado correctamente!' })
  })
}
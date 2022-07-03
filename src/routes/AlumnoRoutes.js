const express = require('express')
const router = express.Router()
const alumnosController = require('../controllers/AlumnoController')

router.get('/listar', alumnosController.findAll)

router.post('/crear', alumnosController.create)

router.get('/listaruno/:id', alumnosController.findById)

router.put('/actualizar/:id', alumnosController.update)

router.delete('/eliminar/:id', alumnosController.delete)

module.exports = router
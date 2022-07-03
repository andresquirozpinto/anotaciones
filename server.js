const express = require('express')
const bodyParser = require('body-parser')

const path = require ('path')

const alumnoRoutes = require('./src/routes/AlumnoRoutes')

const app = express()
const port = process.env.port || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('static'))
app.use(express.static('public'))
//Al ejecutar el servidor se abre el primer HTML
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.use('/api/alumnos', alumnoRoutes)

app.listen(port, () => {
  console.log(`Servidor listo en puerto ${port}`);
})


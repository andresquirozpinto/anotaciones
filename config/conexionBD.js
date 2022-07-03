'use strict'
const mysql = require('mysql')

const conexionBD = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'anotaciones'
})

conexionBD.connect(function(err) {
  if (err) throw err
  console.log("Conectado!")
})

module.exports = conexionBD
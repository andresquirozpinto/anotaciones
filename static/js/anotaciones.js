const cargarElementosPlantilla = () => {
  //crear html de formulario
  const formulario = `
  <form class="form-group" id="formulario-anotaciones">
  <div class="mb-3">
      <label for="titulo" class="form-label">Nombre del alumno</label>
      <input type="text" class="form-control" id="nombre" minlength="1" maxlength="100" placeholder="Nombre Apellido" required>
  </div>
  <div class="mb-3">
      <label for="texto" class="form-label">Anotación</label>
      <input type="text" class="form-control" id="anotacion" minlength="1" maxlength="300" placeholder="Hasta 300 caracteres" required>
  </div>
  <div class="mb-3">
      <label for="texto" class="form-label">Curso</label>
      <input type="text" class="form-control" id="curso" minlength="1" maxlength="3" placeholder="Ejemplo: 3°A" required>
  </div>
  <div class="mb-3">
      <label for="texto" class="form-label">Fecha</label>
      <input type="date" class="form-control" id="fecha" minlength="1" maxlength="10" placeholder="Ejemplo: 03/07/2022" required>
  </div>
  </form>
  `
  //crear html de listado, etiqueta ul
  const tablaDatos = `
  <div class="row mb-0 mx-0 mt-3 border border-4" style="background: white;">
    <div class="col d-flex text-center">
        <div class="col-2 fw-bold fs-5">
          Nombre
        </div>
        <div class="col-2 fw-bold fs-5">
          Curso
        </div>
        <div class="col-2 fw-bold fs-5">
          Anotacion
        </div>
        <div class="col-2 fw-bold fs-5">
          Fecha
        </div>
        <div class="col-3 fw-bold fs-5">
          Acciones
        </div>
      </div>
    </div>
    <ul id="lista-anotaciones" class="list-group">
      
    </ul>
    <ul id="alumno-encontrado" class="list-group">
      
    </ul>

    <div id="no-encontrado" class="col-12 text-center">
      <div class="mt-3 fs-5 text-white">Sin datos para cargar</div>
      <div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `
  //llamar por ID los contenedores para dibujar el html dentro de cada uno(listaDatos, Formulario)
  const seccionDatos = document.getElementById('contenedor-datos')
  const seccionFormulario = document.getElementById('seccion-formulario')
  //con innetHTML, dibujamos lo que creamos en el HTML
  seccionDatos.innerHTML = tablaDatos
  seccionFormulario.innerHTML = formulario

}

const listarCargarDatos = async () => {
  //se llama al end point GET (listar todos)
  const respuesta = await fetch('/api/alumnos/listar')
  //le damos formato JSON
  const anotacionesAlumnos = await respuesta.json()
  //console.log(anotacionesAlumnos)

  let mensajeNoEncontrado = document.getElementById('no-encontrado')

  //dibujamos los datos del JSON en una etiqueta li
  const dibujarDatosListado = anotacionAlumno => `
  <li class="list-group-item border border-4">
    <div class="row">
      <div class="col d-flex text-center">
        <div class="col-2">
          ${anotacionAlumno.nombre_alumno}
        </div>
        <div class="col-2">
        ${anotacionAlumno.curso_alumno}
        </div>
        <div class="col-2">
        ${anotacionAlumno.anotacion_alumno}
        </div>
        <div class="col-2">
        ${anotacionAlumno.fecha_anotacion}
        </div>
        <div class="col-1">
          <button class="btn btn-success" style="margin-left: 40px;" data-bs-toggle="modal" data-bs-target="#mimodal" data-update-id="${anotacionAlumno.id}">Editar</button>
        </div>
        <div class="col-1" style="margin-left: 60px;">
          <button class="btn btn-danger" data-delete-id="${anotacionAlumno.id}">Eliminar</button>
        </div>
      </div>
    </div>
  </li>
  `

  const listaAnotacionAlumno = document.getElementById('lista-anotaciones')
  listaAnotacionAlumno.innerHTML = anotacionesAlumnos.map(anotacionAlumno => dibujarDatosListado(anotacionAlumno)).join('')
  console.log(anotacionesAlumnos)
  /*const test = anotacionesAlumnos.map(function (i) {
    return i.nombre_alumno
  })
  console.log(test)*/

  const listaAnotacionAlumnoEncontrado = document.getElementById('alumno-encontrado')
  listaAnotacionAlumnoEncontrado.style.display = 'none'

  mensajeNoEncontrado.style.display = 'none'

  anotacionesAlumnos.forEach(alumno => {

    let btnLimpiarFormularioCerrarModal = document.getElementById('limpiar-formulario')
    btnLimpiarFormularioCerrarModal.onclick = function limpiarFormulario() {
      let formularioAnotacionAlumno = document.getElementById('formulario-anotaciones')
      formularioAnotacionAlumno.reset()
      document.getElementById('btnCrearAlumno').style.display = 'block'
      document.getElementById('btnActualizarAlumno').style.display = 'none'
    }

    let btnBuscadorPorNombre = document.getElementById('btnBuscador')
    let txtBuscadorPorNombre = document.getElementById('inputBuscador')

    btnBuscadorPorNombre.onclick = async function buscarPorNombre() {
      if (txtBuscadorPorNombre.value == "") {
        alert('Debe escribir un nombre antes de buscar')
      } else {
        if (txtBuscadorPorNombre.value != alumno.nombre_alumno) {
          //alert('no se encontro nada')
          mensajeNoEncontrado.style.display = 'block'
        }
        const respuesta = await fetch('/api/alumnos/listarPorNombre/' + txtBuscadorPorNombre.value)
        const alumnoEncontrado = await respuesta.json()
        console.log(alumnoEncontrado)

        listaAnotacionAlumno.style.display = 'none'

        const dibujarDatosEncontrado = anotacionAlumno => `
        <li class="list-group-item border border-4">
          <div class="row">
            <div class="col d-flex text-center">
              <div class="col-2">
                ${anotacionAlumno.nombre_alumno}
              </div>
              <div class="col-2">
              ${anotacionAlumno.curso_alumno}
              </div>
              <div class="col-2">
              ${anotacionAlumno.anotacion_alumno}
              </div>
              <div class="col-2">
              ${anotacionAlumno.fecha_anotacion}
              </div>
              <div class="col-1">
                <button class="btn btn-success" style="margin-left: 40px;" data-bs-toggle="modal" data-bs-target="#mimodal" data-update-id="${anotacionAlumno.id}">Editar</button>
              </div>
              <div class="col-1" style="margin-left: 60px;">
                <button class="btn btn-danger" data-delete-id="${anotacionAlumno.id}">Eliminar</button>
              </div>
            </div>
          </div>
        </li>
        `
        listaAnotacionAlumnoEncontrado.innerHTML = alumnoEncontrado.map(anotacionAlumno => dibujarDatosEncontrado(anotacionAlumno)).join('')
        listaAnotacionAlumnoEncontrado.style.display = 'block'
        txtBuscadorPorNombre.value = ""

        let btnListarTodos = document.getElementById('btnListarTodos')
        btnListarTodos.onclick = async function listarTodos() {
          listaAnotacionAlumnoEncontrado.style.display = 'none'
          listaAnotacionAlumno.style.display = 'block'
          mensajeNoEncontrado.style.display = 'none'
        }
      }

    }


    //cada fila del listado
    const deleteNodoAlumno = document.querySelector(`[data-delete-id="${alumno.id}"]`)
    deleteNodoAlumno.onclick = async e => {
      await fetch(`/api/alumnos/eliminar/${alumno.id}`, {
        method: 'DELETE'
      })
      //sin el parentNode se elimina solo el boton, por eso se agrega
      deleteNodoAlumno.parentNode.remove()
      console.log('El ID eliminado es:' + alumno.id)
      alert('Registro eliminado correctamente')
      location.reload()
    }

    const updateNodoAlumno = document.querySelector(`[data-update-id="${alumno.id}"]`)
    updateNodoAlumno.onclick = async e => {
      let idAlumnoSeleccionado = alumno.id
      console.log('IDSELECCIONADO: ' + idAlumnoSeleccionado)
      document.getElementById('btnCrearAlumno').style.display = 'none'
      document.getElementById('btnActualizarAlumno').style.display = 'block'

      console.log('ID ALUMNO A ACTUALIZAR: ' + alumno.id + ' NOMBRE: ' + alumno.nombre_alumno)

      let txtNombre = document.getElementById('nombre')
      let txtAnotacion = document.getElementById('anotacion')
      let txtCurso = document.getElementById('curso')
      let txtFecha = document.getElementById('fecha')
      //cargar datos en el formulario dado el ID
      txtNombre.value = alumno.nombre_alumno
      txtCurso.value = alumno.curso_alumno
      txtAnotacion.value = alumno.anotacion_alumno
      txtFecha.value = alumno.fecha_anotacion

      let formularioAnotacionAlumno = document.getElementById('formulario-anotaciones')

      let btnActualizarAlumno = document.getElementById('btnActualizarAlumno')

      btnActualizarAlumno.onclick = function actualizarAlumno() {

        let alumno = {
          nombre_alumno: txtNombre.value,
          curso_alumno: txtCurso.value,
          anotacion_alumno: txtAnotacion.value,
          fecha_anotacion: txtFecha.value
        }
        console.log('IDSELECCIONADOCARGADO: ' + idAlumnoSeleccionado)
        console.log(alumno)

        fetch(`/api/alumnos/actualizar/${idAlumnoSeleccionado}`, {
          method: 'PUT',
          body: JSON.stringify(alumno),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        formularioAnotacionAlumno.reset()
        document.getElementById('btnCrearAlumno').style.display = 'block'
        document.getElementById('btnActualizarAlumno').style.display = 'none'
        listarCargarDatos()
      }
    }
  })
}

const agregarAlumno = () => {
  let formularioAnotacionAlumno = document.getElementById('formulario-anotaciones')
  document.getElementById('btnActualizarAlumno').style.display = 'none'
  document.getElementById('btnCrearAlumno').style.display = 'block'
  let txtNombre = document.getElementById('nombre')
  let txtAnotacion = document.getElementById('anotacion')
  let txtCurso = document.getElementById('curso')
  let txtFecha = document.getElementById('fecha')
  let btnGuardarAlumno = document.getElementById('btnCrearAlumno')
  btnGuardarAlumno.onclick = function guardarAlumno() {
    let alumno = {
      nombre_alumno: txtNombre.value,
      curso_alumno: txtCurso.value,
      anotacion_alumno: txtAnotacion.value,
      fecha_anotacion: txtFecha.value
    }
    console.log(alumno)

    if (txtNombre.value == "" || txtAnotacion.value == "" || txtCurso.value == "" || txtFecha.value == "") {
      alert('Debe completar todos los campos!!')
    } else {
      fetch('/api/alumnos/crear', {
        method: 'POST',
        body: JSON.stringify(alumno),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      alert('Registro exitoso!!')
    }

    //limpiando formulario despues de agregar
    /*txtNombre.value = ""
    txtAnotacion.value = ""
    txtCurso.value = ""
    txtFecha.value = ""*/
    formularioAnotacionAlumno.reset()
    //volvemos a cargar listado para que aparezca el recien creado
    listarCargarDatos()
  }
}

window.onload = () => {
  cargarElementosPlantilla()
  listarCargarDatos()
  agregarAlumno()
}
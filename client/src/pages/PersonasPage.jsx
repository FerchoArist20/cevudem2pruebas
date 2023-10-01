import { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useAppContext } from '../context/Provider'
import TableComponent from '../components/TableComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import FormPersona from '../components/FormPersona'

function PersonasPage() {
  const { notif, personas, buscarPersonas, eliminarPersona } = useAppContext()

  useEffect(() => {
    buscarPersonas()
  }, [])

  function borrarPersona(documento) {
    Swal.fire({
      title: 'Eliminar persona',
      text: `¿Está seguro/a de eliminar a la persona ${documento}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c92534',
      cancelButtonColor: '#7a7a7a',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await eliminarPersona(documento)

        if (respuesta.error) {
          notif("error", "Hubo un error al intentar eliminar la persona. Probablemente sea porque hay procesos asociados a nombre de dicha persona.")
        }
        else {
          notif("success", "Persona eliminada correctamente.")
        }
      }
    })
  }

  const columns = [
    {
      id: 'documento',
      label: 'Documento'
    },
    {
      id: 'nombre_completo',
      label: 'Nombre completo'
    },
    {
      id: 'correo_electronico',
      label: 'Correo electrónico'
    },
    {
      id: 'telefono',
      label: 'Teléfono'
    },
    {
      id: 'rol',
      label: 'Rol'
    },
    {
      id: 'opciones',
      label: 'Opciones'
    }
  ]

  let rows = personas.map((p) => {
    return {
      documento: `${p.tipo_documento.toUpperCase()} ${p.documento}`,
      nombre_completo: `${p.primer_nombre} ${p.segundo_nombre ? p.segundo_nombre : ""} ${p.primer_apellido} ${p.segundo_apellido ? p.segundo_apellido : ""}`,
      correo_electronico: p.correo_electronico,
      telefono: p.telefono,
      rol: p.rol[0].toUpperCase() + p.rol.slice(1),
      opciones: (
        <div className="flex items-center">
          <Link to={`./edit/${p.documento}`} className="mr-1">
            <button className="flex items-center justify-between px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-orange border border-transparent rounded-md hover:bg-orange focus:outline-none focus:shadow-outline-purple">
              <svg className="w-4 h-4" fill="currentColor" aria-hidden="true" viewBox="0 0 20 20">
                <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
              </svg>
            </button>
          </Link>
          <button
            className="flex items-center justify-between px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-secondary border border-transparent rounded-md hover:bg-secondary focus:outline-none focus:shadow-outline-purple"
            onClick={() => { borrarPersona(p.documento) }}
          >
            <svg className="w-4 h-4" fill="currentColor" aria-hidden="true" viewBox="0 0 20 20">
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </svg>
          </button>
        </div>
      )
    }
  })

  return (
    <div className="container px-6 mx-auto grid">
      <div className="flex items-center justify-between">
        <h2
          className="my-6 text-2xl font-semibold text-dark"
        >
          Personas
        </h2>
        <div className="my-6 flex mb-4">
          <Link to="./add">
            <button className="flex items-center justify-between px-4 py-2 mb-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg hover:bg-blue-500 focus:outline-none focus:shadow-outline-purple">
              <svg className="w-4 h-4 mr-2 -ml-1" fill="currentColor" aria-hidden="true" viewBox="0 0 20 20">
                <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
              </svg>
              <span>Añadir persona</span>
            </button>
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<TableComponent columns={columns} rows={rows} />} />
        <Route path="/add" element={<FormPersona/>} />
        <Route path="/edit/:documento" element={<FormPersona/>} />
      </Routes>
    </div>
  )
}

export default PersonasPage
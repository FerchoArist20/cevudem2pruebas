import { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useAppContext } from '../context/Provider'
import TableComponent from '../components/TableComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import FormSolicitud from '../components/FormSolicitud'

function SolicitudesVivesPage() {
  const { notif, solicitudes, buscarSolicitudes, eliminarSolicitud } = useAppContext()

  useEffect(() => {
    buscarSolicitudes()
  }, [])

  function borrarSolicitud(id) {
    Swal.fire({
      title: 'Eliminar solicitud',
      text: `¿Está seguro/a de eliminar la solicitud ${id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c92534',
      cancelButtonColor: '#7a7a7a',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await eliminarSolicitud(id)

        if (respuesta.error) {
          notif("error", "Hubo un error al intentar eliminar la solicitud.")
        }
        else {
          notif("success", "Solicitud eliminada correctamente.")
        }
      }
    })
  }

  const columns = [
    {
      id: 'id',
      label: '#'
    },
    {
      id: 'estudiante',
      label: 'Documento del estudiante'
    },
    {
      id: 'fecha_hora_entrevista',
      label: 'Fecha/hora de la entrevista'
    },
    {
      id: 'estado',
      label: 'Estado'
    },
    {
      id: 'responsable',
      label: 'Documento del responsable'
    },
    {
      id: 'opciones',
      label: 'Opciones'
    }
  ]

  let rows = solicitudes.map((s) => {
    return {
      id: s.id,
      estudiante: s.estudiante,
      fecha_hora_entrevista: new Date(s.fecha_hora_entrevista).toLocaleDateString() + " " + new Date(s.fecha_hora_entrevista).toLocaleTimeString(),
      estado: s.estado[0].toUpperCase() + s.estado.slice(1),
      responsable: s.responsable,
      opciones: (
        <div className="flex items-center">
          <Link to={`./edit/${s.id}`} className="mr-1">
            <button className="flex items-center justify-between px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-orange border border-transparent rounded-md hover:bg-orange focus:outline-none focus:shadow-outline-purple">
              <svg className="w-4 h-4" fill="currentColor" aria-hidden="true" viewBox="0 0 20 20">
                <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
              </svg>
            </button>
          </Link>
          <button
            className="flex items-center justify-between px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-secondary border border-transparent rounded-md hover:bg-secondary focus:outline-none focus:shadow-outline-purple"
            onClick={() => { borrarSolicitud(s.id) }}
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
          Solicitudes
        </h2>
        <div className="my-6 flex mb-4">
          <Link to="./add">
            <button className="flex items-center justify-between px-4 py-2 mb-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg hover:bg-blue-500 focus:outline-none focus:shadow-outline-purple">
              <svg className="w-4 h-4 mr-2 -ml-1" fill="currentColor" aria-hidden="true" viewBox="0 0 20 20">
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
              </svg>
              <span>Añadir solicitud</span>
            </button>
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<TableComponent columns={columns} rows={rows} />} />
        <Route path="/add" element={<FormSolicitud />} />
        <Route path="/edit/:id" element={<FormSolicitud />} />
      </Routes>
    </div>
  )
}

export default SolicitudesVivesPage
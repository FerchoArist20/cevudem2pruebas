import { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useAppContext } from '../context/Provider'
import TableComponent from '../components/TableComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import FormContrato from '../components/FormContrato'

function ContratosVivesPage() {
  const { notif, contratos, buscarContratos, eliminarContrato } = useAppContext()

  useEffect(() => {
    buscarContratos()
  }, [])

  function borrarContrato(id) {
    Swal.fire({
      title: 'Eliminar contrato',
      text: `¿Está seguro/a de eliminar el contrato ${id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c92534',
      cancelButtonColor: '#7a7a7a',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await eliminarContrato(id)

        if (respuesta.error) {
          notif("error", "Hubo un error al intentar eliminar el contrato.")
        }
        else {
          notif("success", "Contrato eliminado correctamente.")
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
      id: 'fecha_inicio',
      label: 'Fecha de inicio'
    },
    {
      id: 'fecha_fin',
      label: 'Fecha de fin'
    },
    {
      id: 'apartamento',
      label: 'Apartamento'
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
      id: 'observaciones',
      label: 'Observaciones'
    },
    {
      id: 'opciones',
      label: 'Opciones'
    }
  ]

  let rows = contratos.map((c) => {
    return {
      id: c.id,
      estudiante: c.estudiante,
      fecha_inicio: new Date(c.fecha_inicio).toLocaleDateString(),
      fecha_fin: new Date(c.fecha_fin).toLocaleDateString(),
      apartamento: c.apartamento,
      estado: c.estado[0].toUpperCase() + c.estado.slice(1),
      responsable: c.responsable,
      observaciones: c.observaciones,
      opciones: (
        <div className="flex items-center">
          <Link to={`./edit/${c.id}`} className="mr-1">
            <button className="flex items-center justify-between px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-orange border border-transparent rounded-md hover:bg-orange focus:outline-none focus:shadow-outline-purple">
              <svg className="w-4 h-4" fill="currentColor" aria-hidden="true" viewBox="0 0 20 20">
                <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
              </svg>
            </button>
          </Link>
          <button
            className="flex items-center justify-between px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-secondary border border-transparent rounded-md hover:bg-secondary focus:outline-none focus:shadow-outline-purple"
            onClick={() => { borrarContrato(c.id) }}
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
          Contratos
        </h2>
        <div className="my-6 flex mb-4">
          <Link to="./add">
            <button className="flex items-center justify-between px-4 py-2 mb-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg hover:bg-blue-500 focus:outline-none focus:shadow-outline-purple">
              <svg className="w-4 h-4 mr-2 -ml-1" fill="currentColor" aria-hidden="true" viewBox="0 0 20 20">
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
              </svg>
              <span>Añadir contrato</span>
            </button>
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<TableComponent columns={columns} rows={rows} />} />
        <Route path="/add" element={<FormContrato />} />
        <Route path="/edit/:id" element={<FormContrato />} />
      </Routes>
    </div>
  )
}

export default ContratosVivesPage
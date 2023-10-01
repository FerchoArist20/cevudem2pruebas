import { useEffect } from 'react'
import { useAppContext } from '../context/Provider'
import { Routes, Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReceipt, faCalendarAlt, faClipboardList, faBuilding, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import UsersList from '../components/UsersList'
import FormUsuario from '../components/FormUsuario'

function InicioPage() {
  const {
    usuarios, buscarUsuarios,
    numReservas, contarReservas,
    numEventos, contarEventos,
    numSolicitudes, contarSolicitudes,
    numContratos, contarContratos
  } = useAppContext()

  function cargarEstadisticas() {
    contarReservas()
    contarEventos()
    contarSolicitudes()
    contarContratos()
  }

  useEffect(() => {
    cargarEstadisticas()
    buscarUsuarios()
  }, [])

  return (
    <div className="container px-6 mx-auto grid">
      <h2
        className="my-6 text-2xl font-semibold text-dark"
      >
        Inicio
      </h2>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <div
          className="flex items-center p-4 bg-white rounded-lg shadow-xs"
        >
          <div
            className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <FontAwesomeIcon icon={faReceipt}></FontAwesomeIcon>
            </svg>
          </div>
          <div>
            <p
              className="mb-2 text-sm font-medium text-gray-600"
            >
              Reservas registradas
            </p>
            <p
              className="text-lg font-semibold text-gray-700"
            >
              {numReservas}
            </p>
          </div>
        </div>
        <div
          className="flex items-center p-4 bg-white rounded-lg shadow-xs"
        >
          <div
            className="p-3 mr-4 text-green-500 bg-green-100 rounded-full"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon>
            </svg>
          </div>
          <div>
            <p
              className="mb-2 text-sm font-medium text-gray-600"
            >
              Eventos registrados
            </p>
            <p
              className="text-lg font-semibold text-gray-700"
            >
              {numEventos}
            </p>
          </div>
        </div>
        <div
          className="flex items-center p-4 bg-white rounded-lg shadow-xs"
        >
          <div
            className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <FontAwesomeIcon icon={faClipboardList}></FontAwesomeIcon>
            </svg>
          </div>
          <div>
            <p
              className="mb-2 text-sm font-medium text-gray-600"
            >
              Solicitudes realizadas
            </p>
            <p
              className="text-lg font-semibold text-gray-700"
            >
              {numSolicitudes}
            </p>
          </div>
        </div>
        <div
          className="flex items-center p-4 bg-white rounded-lg shadow-xs"
        >
          <div
            className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon>
            </svg>
          </div>
          <div>
            <p
              className="mb-2 text-sm font-medium text-gray-600"
            >
              Contratos activos
            </p>
            <p
              className="text-lg font-semibold text-gray-700"
            >
              {numContratos}
            </p>
          </div>
        </div>
      </div>

      <hr className="mb-8" />

      <div className="flex items-center justify-between gap-6">
        <h4 className="mb-4 text-lg font-semibold text-dark">
          Gestionar equipo
        </h4>

        <Link to="./add">
          <button className="flex items-center justify-between px-4 py-2 mb-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg hover:bg-blue-500 focus:outline-none focus:shadow-outline-purple">
            <svg className="w-4 h-4 mr-2 -ml-1" fill="currentColor" aria-hidden="true" viewBox="0 0 20 20">
              <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
            </svg>
            <span>Añadir miembro</span>
          </button>
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<UsersList users={usuarios} />} />
        <Route path="/add" element={<FormUsuario />} />
        <Route path="/edit/:documento" element={<FormUsuario />} />
      </Routes>
    </div>
  )
}

export default InicioPage
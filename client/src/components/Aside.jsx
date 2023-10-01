import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers, faReceipt, faCalendarAlt, faClipboardList, faBuilding, faBed, faKaaba, faDoorClosed } from '@fortawesome/free-solid-svg-icons'

function Aside() {
    return (
        <aside
            className="z-20 hidden w-64 overflow-y-auto bg-dark md:block flex-shrink-0"
        >
            <div className="py-4 text-light">
                <img
                    className="ml-6"
                    src="http://localhost:5173/src/assets/img/Logo_UdeMedellin_Contraste.png"
                />

                <ul className="mt-6">
                    <li className="relative px-6 py-3">
                        <Link
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray"
                            to="/dashboard"
                        >
                            {useLocation().pathname === "/dashboard" ? (
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-primary rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"
                                ></span>
                            ) : null}
                            < FontAwesomeIcon icon={faHome} />
                            <span className="ml-4">Inicio</span>
                        </Link>
                    </li>
                </ul>

                <ul>
                    <li className="relative px-6 py-3">
                        <Link
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray"
                            to="/dashboard/personas"
                        >
                            {useLocation().pathname === "/dashboard/personas" ? (
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-primary rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"
                                ></span>
                            ) : null}
                            <FontAwesomeIcon icon={faUsers} />
                            <span className="ml-4">Personas</span>
                        </Link>
                    </li>

                    <div className="a-section">
                        <span>Casa Club del Egresado</span>
                    </div>

                    <li className="relative px-6 py-3">
                        <Link
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray"
                            to="/dashboard/habitaciones-club"
                        >
                            {useLocation().pathname === "/dashboard/habitaciones-club" ? (
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-primary rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"
                                ></span>
                            ) : null}
                            <FontAwesomeIcon icon={faBed} />
                            <span className="ml-4">Habitaciones</span>
                        </Link>
                    </li>

                    <li className="relative px-6 py-3">
                        <Link
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray"
                            to="/dashboard/reservas-club"
                        >
                            {useLocation().pathname === "/dashboard/reservas-club" ? (
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-primary rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"
                                ></span>
                            ) : null}
                            <FontAwesomeIcon icon={faReceipt} />
                            <span className="ml-4">Reservas</span>
                        </Link>
                    </li>

                    <li className="relative px-6 py-3">
                        <Link
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray"
                            to="/dashboard/lugares-club"
                        >
                            {useLocation().pathname === "/dashboard/lugares-club" ? (
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-primary rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"
                                ></span>
                            ) : null}
                            <FontAwesomeIcon icon={faKaaba} />
                            <span className="ml-4">Lugares</span>
                        </Link>
                    </li>

                    <li className="relative px-6 py-3">
                        <Link
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray"
                            to="/dashboard/eventos-club"
                        >
                            {useLocation().pathname === "/dashboard/eventos-club" ? (
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-primary rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"
                                ></span>
                            ) : null}
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            <span className="ml-4">Eventos</span>
                        </Link>
                    </li>

                    <div className="a-section">
                        <span>Viviendas Vives</span>
                    </div>

                    <li className="relative px-6 py-3">
                        <Link
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray"
                            to="/dashboard/apartamentos-vives"
                        >
                            {useLocation().pathname === "/dashboard/apartamentos-vives" ? (
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-primary rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"
                                ></span>
                            ) : null}
                            <FontAwesomeIcon icon={faDoorClosed} />
                            <span className="ml-4">Apartamentos</span>
                        </Link>
                    </li>

                    <li className="relative px-6 py-3">
                        <Link
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray"
                            to="/dashboard/solicitudes-vives"
                        >
                            {useLocation().pathname === "/dashboard/solicitudes-vives" ? (
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-primary rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"
                                ></span>
                            ) : null}
                            <FontAwesomeIcon icon={faClipboardList} />
                            <span className="ml-4">Solicitudes</span>
                        </Link>
                    </li>

                    <li className="relative px-6 py-3">
                        <Link
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray"
                            to="/dashboard/contratos-vives"
                        >
                            {useLocation().pathname === "/dashboard/contratos-vives" ? (
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-primary rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"
                                ></span>
                            ) : null}
                            <FontAwesomeIcon icon={faBuilding} />
                            <span className="ml-4">Contratos</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Aside
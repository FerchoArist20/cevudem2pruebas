import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed } from '@fortawesome/free-solid-svg-icons'

function HabitacionCard({ habitacion }) {
    let bgCard = ""
    let detail = ""

    if (habitacion.habilitada == null) {
        bgCard = "bg-secondary"
        detail = "Deshabilitada"
    }
    else {
        if (habitacion.disponible == null) {
            bgCard = "bg-primary"
            detail = "No disponible"
        }
        else {
            bgCard = "bg-green"
            detail = "Disponible"
        }
    }

    return (
        <div className={"min-w-0 p-2 text-white rounded-lg shadow-xs " + bgCard}>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                <div className={"p-2 mr-4 text-white rounded-full " + bgCard}>
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <FontAwesomeIcon icon={faBed}></FontAwesomeIcon>
                    </svg>
                </div>
                <div>
                    <p className="mb-2 text-lg font-bold text-black">
                        {habitacion.id}
                    </p>
                    <p className="mb-2 text-sm font-medium text-gray-700">
                        Capacidad: {habitacion.capacidad} personas
                    </p>
                    <p className="mb-2 text-sm font-medium italic text-gray-700">
                        {detail}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HabitacionCard
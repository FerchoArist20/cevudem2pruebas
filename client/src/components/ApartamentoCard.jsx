import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons'

function ApartamentoCard({ apartamento }) {
    let bgCard = ""
    let detail = ""

    if (apartamento.habilitado == null) {
        bgCard = "bg-secondary"
        detail = "Deshabilitado"
    }
    else {
        if (apartamento.disponible == null) {
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
                        <FontAwesomeIcon icon={faDoorClosed}></FontAwesomeIcon>
                    </svg>
                </div>
                <div>
                    <p className="mb-2 text-lg font-bold text-black">
                        {apartamento.id}
                    </p>
                    <p className="mb-2 text-sm font-medium text-gray-700">
                        Tipo: {apartamento.tipo.charAt(0).toUpperCase() + apartamento.tipo.slice(1)}
                    </p>
                    <p className="mb-2 text-sm font-medium italic text-gray-700">
                        {detail}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ApartamentoCard
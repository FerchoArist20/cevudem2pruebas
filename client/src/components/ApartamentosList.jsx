import ApartamentoCard from './ApartamentoCard'

function ApartamentosList({ apartamentos }) {
    if (apartamentos.length === 0) {
        return <p className="mb-2 text-sm font-medium text-gray-600">No hay apartamentos...</p>
    }
    else {
        return (
            <div className="grid gap-6 mb-8 md:grid-cols-3">
                {apartamentos.map(apartamento => (
                    <ApartamentoCard apartamento={apartamento} key={apartamento.id} />
                ))}
            </div>
        )
    }
}

export default ApartamentosList
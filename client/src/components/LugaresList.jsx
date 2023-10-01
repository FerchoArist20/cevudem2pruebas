import LugarCard from './LugarCard'

function LugaresList({ lugares }) {
    if (lugares.length === 0) {
        return <p className="mb-2 text-sm font-medium text-gray-600">No hay lugares...</p>
    }
    else {
        return (
            <div className="grid gap-6 mb-8 md:grid-cols-3">
                {lugares.map(lugar => (
                    <LugarCard lugar={lugar} key={lugar.id} />
                ))}
            </div>
        )
    }
}

export default LugaresList
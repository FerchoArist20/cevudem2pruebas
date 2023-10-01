import HabitacionCard from './HabitacionCard'

function HabitacionesList({ habitaciones }) {
    if (habitaciones.length === 0) {
        return <p className="mb-2 text-sm font-medium text-gray-600">No hay habitaciones...</p>
    }
    else {
        return (
            <div className="grid gap-6 mb-8 md:grid-cols-3">
                {habitaciones.map(habitacion => (
                    <HabitacionCard habitacion={habitacion} key={habitacion.id} />
                ))}
            </div>
        )
    }
}

export default HabitacionesList
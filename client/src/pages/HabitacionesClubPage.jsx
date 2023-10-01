import { useEffect } from 'react'
import { useAppContext } from '../context/Provider'
import HabitacionesList from '../components/HabitacionesList'

function HabitacionesClubPage() {
    const { habitaciones, buscarHabitaciones } = useAppContext()

    useEffect(() => {
        buscarHabitaciones()
    }, [])

    return (
        <div className="container px-6 mx-auto grid">
            <h2
                className="my-6 text-2xl font-semibold text-dark"
            >
                Habitaciones
            </h2>

            <HabitacionesList habitaciones={habitaciones} />
        </div>
    )
}

export default HabitacionesClubPage
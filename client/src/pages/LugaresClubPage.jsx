import { useEffect } from 'react'
import { useAppContext } from '../context/Provider'
import LugaresList from '../components/LugaresList'

function LugaresClubPage() {
    const { lugares, buscarLugares } = useAppContext()

    useEffect(() => {
        buscarLugares()
    }, [])

    return (
        <div className="container px-6 mx-auto grid">
            <h2
                className="my-6 text-2xl font-semibold text-dark"
            >
                Lugares
            </h2>

            <LugaresList lugares={lugares} />
        </div>
    )
}

export default LugaresClubPage
import { useEffect } from 'react'
import { useAppContext } from '../context/Provider'
import ApartamentosList from '../components/ApartamentosList'

function ApartamentosVivesPage() {
    const { apartamentos, buscarApartamentos } = useAppContext()

    useEffect(() => {
        buscarApartamentos()
    }, [])

    return (
        <div className="container px-6 mx-auto grid">
            <h2
                className="my-6 text-2xl font-semibold text-dark"
            >
                Apartamentos
            </h2>

            <ApartamentosList apartamentos={apartamentos} />
        </div>
    )
}

export default ApartamentosVivesPage
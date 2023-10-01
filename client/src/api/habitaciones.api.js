import axios from 'axios'
import { ROUTE } from './config.api'

export const requestBuscarHabitaciones = async () => {
    return await axios.get(`${ROUTE}/habitaciones`)
}
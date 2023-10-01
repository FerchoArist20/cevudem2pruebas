import axios from 'axios'
import { ROUTE } from './config.api'

export const requestBuscarApartamentos = async () => {
    return await axios.get(`${ROUTE}/apartamentos`)
}
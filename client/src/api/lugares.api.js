import axios from 'axios'
import { ROUTE } from './config.api'

export const requestBuscarLugares = async () => {
    return await axios.get(`${ROUTE}/lugares`)
}
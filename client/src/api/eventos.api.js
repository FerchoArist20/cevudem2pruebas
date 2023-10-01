import axios from 'axios'
import { ROUTE } from './config.api'

export const requestContarEventos = async () => {
    return await axios.get(`${ROUTE}/eventos-count`)
}

export const requestBuscarEventos = async () => {
    return await axios.get(`${ROUTE}/eventos`)
}

export const requestBuscarEvento = async (id) => {
    return await axios.get(`${ROUTE}/eventos/${id}`)
}

export const requestInsertarEvento = async (datos) => {
    return await axios.post(`${ROUTE}/eventos`, datos)
}

export const requestActualizarEvento = async (id, datos) => {
    return await axios.put(`${ROUTE}/eventos/${id}`, datos)
}

export const requestEliminarEvento = async (id) => {
    return await axios.delete(`${ROUTE}/eventos/${id}`)
}
import axios from 'axios'
import { ROUTE } from './config.api'

export const requestBuscarPersonas = async () => {
    return await axios.get(`${ROUTE}/personas`)
}

export const requestBuscarPersona = async (documento) => {
    return await axios.get(`${ROUTE}/personas/${documento}`)
}

export const requestInsertarPersona = async (datos) => {
    return await axios.post(`${ROUTE}/personas`, datos)
}

export const requestActualizarPersona = async (documento, datos) => {
    return await axios.put(`${ROUTE}/personas/${documento}`, datos)
}

export const requestEliminarPersona = async (documento) => {
    return await axios.delete(`${ROUTE}/personas/${documento}`)
}
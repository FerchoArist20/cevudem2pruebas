import axios from 'axios'
import { ROUTE } from './config.api'

export const requestContarReservas = async () => {
    return await axios.get(`${ROUTE}/reservas-count`)
}

export const requestBuscarReservas = async () => {
    return await axios.get(`${ROUTE}/reservas`)
}

export const requestBuscarReserva = async (id) => {
    return await axios.get(`${ROUTE}/reservas/${id}`)
}

export const requestInsertarReserva = async (datos) => {
    return await axios.post(`${ROUTE}/reservas`, datos)
}

export const requestActualizarReserva = async (id, datos) => {
    return await axios.put(`${ROUTE}/reservas/${id}`, datos)
}

export const requestEliminarReserva = async (id) => {
    return await axios.delete(`${ROUTE}/reservas/${id}`)
}
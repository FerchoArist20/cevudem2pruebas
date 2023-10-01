import axios from 'axios'
import { ROUTE } from './config.api'

export const requestContarSolicitudes = async () => {
    return await axios.get(`${ROUTE}/solicitudes-count`)
}

export const requestBuscarSolicitudes = async () => {
    return await axios.get(`${ROUTE}/solicitudes`)
}

export const requestBuscarSolicitud = async (id) => {
    return await axios.get(`${ROUTE}/solicitudes/${id}`)
}

export const requestInsertarSolicitud= async (datos) => {
    return await axios.post(`${ROUTE}/solicitudes`, datos)
}

export const requestActualizarSolicitud = async (id, datos) => {
    return await axios.put(`${ROUTE}/solicitudes/${id}`, datos)
}

export const requestEliminarSolicitud = async (id) => {
    return await axios.delete(`${ROUTE}/solicitudes/${id}`)
}
import axios from 'axios'
import { ROUTE } from './config.api'

export const requestContarContratos = async () => {
    return await axios.get(`${ROUTE}/contratos-count`)
}

export const requestBuscarContratos = async () => {
    return await axios.get(`${ROUTE}/contratos`)
}

export const requestBuscarContrato = async (id) => {
    return await axios.get(`${ROUTE}/contratos/${id}`)
}

export const requestInsertarContrato = async (datos) => {
    return await axios.post(`${ROUTE}/contratos`, datos)
}

export const requestActualizarContrato = async (id, datos) => {
    return await axios.put(`${ROUTE}/contratos/${id}`, datos)
}

export const requestEliminarContrato = async (id) => {
    return await axios.delete(`${ROUTE}/contratos/${id}`)
}
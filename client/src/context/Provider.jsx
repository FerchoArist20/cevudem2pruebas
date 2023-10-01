import { useContext, useState, useEffect } from "react";
import { Context } from './Context'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import * as Usuarios from '../api/usuarios.api'
import * as Personas from '../api/personas.api'
import * as Reservas from '../api/reservas.api'
import * as Eventos from '../api/eventos.api'
import * as Solicitudes from '../api/solicitudes.api'
import * as Contratos from '../api/contratos.api'
import * as Lugares from '../api/lugares.api'
import * as Habitaciones from '../api/habitaciones.api'
import * as Apartamentos from '../api/apartamentos.api'

export const useAppContext = () => {
    const context = useContext(Context)

    if (!context) {
        throw new Error("useAppContext must be used within a ContextProvider")
    }
    else {
        return context
    }
}

export const ContextProvider = ({ children }) => {
    const navigate = useNavigate()

    const [sesion, setSesion] = useState(JSON.parse(localStorage.getItem('loggedAppUser')))

    async function actualizarDatosSesion() {
        try {
            if (sesion) {
                const datosSesion = await buscarUsuario(sesion.documento)
                localStorage.setItem(
                    'loggedAppUser', JSON.stringify(datosSesion)
                )
                setSesion(datosSesion)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        actualizarDatosSesion()
    }, [])


    // HISTORIA DE USUARIO C7: CERRAR SESIÓN
    const logout = () => {
        localStorage.clear()
        setSesion(null)
        navigate("/")
    }

    const notif = (icon, text) => {
        Swal.fire({
            title: "Mensaje",
            text,
            icon,
            confirmButtonText: "Aceptar"
        })
    }

    //#region Usuarios
    const [usuarios, setUsuarios] = useState([])

    async function buscarUsuarios() {
        try {
            const response = await Usuarios.requestBuscarUsuarios()
            setUsuarios(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function buscarUsuario(documento) {
        try {
            const response = await Usuarios.requestBuscarUsuario(documento)
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function insertarUsuario(datos) {
        try {
            const response = await Usuarios.requestInsertarUsuario(datos)
            buscarUsuarios()
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function actualizarUsuario(documento, datos) {
        try {
            const response = await Usuarios.requestActualizarUsuario(documento, datos)
            buscarUsuarios()
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function actualizarUsuarioDocumento(documento, datos) {
        try {
            const response = await Usuarios.requestActualizarUsuarioDatosDocumento(documento, datos)
            buscarUsuarios()
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function actualizarUsuarioPersonales(documento, datos) {
        try {
            const response = await Usuarios.requestActualizarUsuarioDatosPersonales(documento, datos)
            buscarUsuarios()
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function actualizarUsuarioSeguridad(documento, datos) {
        try {
            const response = await Usuarios.requestActualizarUsuarioDatosSeguridad(documento, datos)
            buscarUsuarios()
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function verificarUsuario(datos) {
        try {
            const response = await Usuarios.requestVerificarUsuario(datos)
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function verificarUsuarioDocumento(documento) {
        try {
            const response = await Usuarios.requestVerificarUsuarioDocumento(documento)
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function verificarUsuarioCorreo(datos) {
        try {
            const response = await Usuarios.requestVerificarUsuarioCorreo(datos)
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function verificarUsuarioClave(datos) {
        try {
            const response = await Usuarios.requestVerificarUsuarioClave(datos)
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }
    //#endregion

    //#region Personas
    const [personas, setPersonas] = useState([])

    async function buscarPersonas() {
        try {
            const response = await Personas.requestBuscarPersonas()
            setPersonas(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function buscarPersona(documento) {
        try {
            const response = await Personas.requestBuscarPersona(documento)
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function insertarPersona(datos) {
        try {
            const response = await Personas.requestInsertarPersona(datos)
            buscarPersonas()
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function actualizarPersona(documento, datos) {
        try {
            const response = await Personas.requestActualizarPersona(documento, datos)
            buscarPersonas()
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function eliminarPersona(documento) {
        try {
            const response = await Personas.requestEliminarPersona(documento)
            buscarPersonas()
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }
    //#endregion

    //#region Reservas
    const [numReservas, setNumReservas] = useState("...")

    async function contarReservas() {
        try {
            const response = await Reservas.requestContarReservas()
            setNumReservas(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const [reservas, setReservas] = useState([])

    async function buscarReservas() {
        try {
            const response = await Reservas.requestBuscarReservas()
            setReservas(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function buscarReserva(id) {
        try {
            const response = await Reservas.requestBuscarReserva(id)
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function insertarReserva(datos) {
        try {
            const response = await Reservas.requestInsertarReserva(datos)
            buscarReservas()
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function actualizarReserva(id, datos) {
        try {
            const response = await Reservas.requestActualizarReserva(id, datos)
            buscarReservas()
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function eliminarReserva(id) {
        try {
            const response = await Reservas.requestEliminarReserva(id)
            buscarReservas()
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }
    //#endregion

    //#region Eventos
    const [numEventos, setNumEventos] = useState("...")

    async function contarEventos() {
        try {
            const response = await Eventos.requestContarEventos()
            setNumEventos(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const [eventos, setEventos] = useState([])

    async function buscarEventos() {
        try {
            const response = await Eventos.requestBuscarEventos()
            setEventos(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function buscarEvento(id) {
        try {
            const response = await Eventos.requestBuscarEvento(id)
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function insertarEvento(datos) {
        try {
            const response = await Eventos.requestInsertarEvento(datos)
            buscarEventos()
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function actualizarEvento(id, datos) {
        try {
            const response = await Eventos.requestActualizarEvento(id, datos)
            buscarEventos()
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function eliminarEvento(id) {
        try {
            const response = await Eventos.requestEliminarEvento(id)
            buscarEventos()
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }
    //#endregion

    //#region Solicitudes
    const [numSolicitudes, setNumSolicitudes] = useState("...")

    async function contarSolicitudes() {
        try {
            const response = await Solicitudes.requestContarSolicitudes()
            setNumSolicitudes(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const [solicitudes, setSolicitudes] = useState([])

    async function buscarSolicitudes() {
        try {
            const response = await Solicitudes.requestBuscarSolicitudes()
            setSolicitudes(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function buscarSolicitud(id) {
        try {
            const response = await Solicitudes.requestBuscarSolicitud(id)
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function insertarSolicitud(datos) {
        try {
            const response = await Solicitudes.requestInsertarSolicitud(datos)
            buscarSolicitudes()
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function actualizarSolicitud(id, datos) {
        try {
            const response = await Solicitudes.requestActualizarSolicitud(id, datos)
            buscarSolicitudes()
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function eliminarSolicitud(id) {
        try {
            const response = await Solicitudes.requestEliminarSolicitud(id)
            buscarSolicitudes()
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }
    //#endregion

    //#region Contratos
    const [numContratos, setNumContratos] = useState("...")

    async function contarContratos() {
        try {
            const response = await Contratos.requestContarContratos()
            setNumContratos(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const [contratos, setContratos] = useState([])

    async function buscarContratos() {
        try {
            const response = await Contratos.requestBuscarContratos()
            setContratos(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function buscarContrato(id) {
        try {
            const response = await Contratos.requestBuscarContrato(id)
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function insertarContrato(datos) {
        try {
            const response = await Contratos.requestInsertarContrato(datos)
            buscarContratos()
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function actualizarContrato(id, datos) {
        try {
            const response = await Contratos.requestActualizarContrato(id, datos)
            buscarContratos()
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function eliminarContrato(id) {
        try {
            const response = await Contratos.requestEliminarContrato(id)
            buscarContratos()
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }
    //#endregion

    //#region Habitaciones
    const [habitaciones, setHabitaciones] = useState([])

    async function buscarHabitaciones() {
        try {
            const response = await Habitaciones.requestBuscarHabitaciones()
            setHabitaciones(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    //#endregion

    //#region Lugares
    const [lugares, setLugares] = useState([])

    async function buscarLugares() {
        try {
            const response = await Lugares.requestBuscarLugares()
            setLugares(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    //#endregion

    //#region Apartamentos
    const [apartamentos, setApartamentos] = useState([])

    async function buscarApartamentos() {
        try {
            const response = await Apartamentos.requestBuscarApartamentos()
            setApartamentos(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    //#endregion

    return (
        <Context.Provider value={{
            notif, sesion, setSesion, logout, actualizarDatosSesion,
            usuarios, buscarUsuarios, buscarUsuario, insertarUsuario, actualizarUsuario, actualizarUsuarioDocumento, actualizarUsuarioPersonales, actualizarUsuarioSeguridad, verificarUsuario, verificarUsuarioDocumento, verificarUsuarioCorreo, verificarUsuarioClave,
            personas, buscarPersonas, buscarPersona, insertarPersona, actualizarPersona, eliminarPersona,
            numReservas, contarReservas, reservas, buscarReservas, buscarReserva, insertarReserva, actualizarReserva, eliminarReserva,
            numEventos, contarEventos, eventos, buscarEventos, buscarEvento, insertarEvento, actualizarEvento, eliminarEvento,
            numSolicitudes, contarSolicitudes, solicitudes, buscarSolicitudes, buscarSolicitud, insertarSolicitud, actualizarSolicitud, eliminarSolicitud,
            numContratos, contarContratos, contratos, buscarContratos, buscarContrato, insertarContrato, actualizarContrato, eliminarContrato,
            habitaciones, buscarHabitaciones,
            lugares, buscarLugares,
            apartamentos, buscarApartamentos
        }}>
            {children}
        </Context.Provider>
    )
}
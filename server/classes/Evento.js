import { Pool } from '../db.js'

export class Evento {
    constructor(e) {
        this.id = e.id ? e.id : null
        this.socio = e.socio ? e.socio : null
        this.fecha_hora_inicio = e.fecha_hora_inicio ? e.fecha_hora_inicio : null
        this.fecha_hora_fin = e.fecha_hora_fin ? e.fecha_hora_fin : null
        this.lugar = e.lugar ? e.lugar : null
        this.numero_asistentes = e.numero_asistentes ? e.numero_asistentes : null
        this.estado = e.estado ? e.estado : null
    }

    static async contarTodos() {
        try {
            const [result] = await Pool.query(
                "SELECT COUNT(*) as num FROM eventos"
            )

            return result[0].num
        }
        catch (error) {
            console.log(error)
            return error
        }
    }

    static async buscarTodos() {
        try {
            const [result] = await Pool.query(
                "SELECT id, socio, fecha_hora_inicio, fecha_hora_fin, lugar, numero_asistentes, estado FROM eventos"
            )

            if (result.length === 0) {
                return false
            }
            else {
                const eventos = []
                result.forEach(e => {
                    eventos.push(new Evento(e))
                })
                return eventos
            }
        }
        catch (error) {
            console.log(error)
            return error
        }

    }

    async buscar() {
        try {
            const [result] = await Pool.query(
                "SELECT id, socio, fecha_hora_inicio, fecha_hora_fin, lugar, numero_asistentes, estado FROM eventos WHERE id = ?",
                this.id
            )
            if (result.length === 0) {
                return false
            }
            else {
                this.id = result[0].id
                this.socio = result[0].socio
                this.fecha_hora_inicio = result[0].fecha_hora_inicio
                this.fecha_hora_fin = result[0].fecha_hora_fin
                this.lugar = result[0].lugar
                this.numero_asistentes = result[0].numero_asistentes
                this.estado = result[0].estado
                return true

            }
        }
        catch (error) {
            console.log(error)
            return error
        }
    }

    async insertar() {
        try {
            const [result] = await Pool.query(
                "INSERT INTO eventos(socio, fecha_hora_inicio, fecha_hora_fin, lugar, numero_asistentes, estado) VALUES (?, ?, ?, ?, ?, ?)",
                [
                    this.socio,
                    this.fecha_hora_inicio,
                    this.fecha_hora_fin,
                    this.lugar,
                    this.numero_asistentes,
                    this.estado
                ]
            )

            if (result.affectedRows === 0) {
                return false
            }
            else {
                return true
            }
        }
        catch (error) {
            console.log(error)
            return error
        }
    }

    async actualizar(id) {
        try {
            const [result] = await Pool.query(
                "UPDATE eventos SET socio = ?, fecha_hora_inicio = ?, fecha_hora_fin = ?, lugar = ?, numero_asistentes = ?, estado = ? WHERE id = ?",
                [
                    this.socio,
                    this.fecha_hora_inicio,
                    this.fecha_hora_fin,
                    this.lugar,
                    this.numero_asistentes,
                    this.estado,
                    id
                ]
            )

            if (result.affectedRows === 0) {
                return false
            }
            else {
                return true
            }
        }
        catch (error) {
            console.log(error)
            return error
        }
    }

    async eliminar() {
        try {
            const [result] = await Pool.query(
                "DELETE FROM eventos WHERE id = ?",
                [
                    this.id
                ]
            )

            if (result.affectedRows === 0) {
                return false
            }
            else {
                return true
            }
        }
        catch (error) {
            console.log(error)
            return error
        }
    }
}
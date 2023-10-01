import { Pool } from '../db.js'

export class Solicitud {
    constructor(s) {
        this.id = s.id ? s.id : null
        this.estudiante = s.estudiante ? s.estudiante : null
        this.fecha_hora_entrevista = s.fecha_hora_entrevista ? s.fecha_hora_entrevista : null
        this.estado = s.estado ? s.estado : null
        this.responsable = s.responsable ? s.responsable : null
    }

    static async contarTodas() {
        try {
            const [result] = await Pool.query(
                "SELECT COUNT(*) as num FROM solicitudes"
            )

            return result[0].num
        }
        catch (error) {
            console.log(error)
            return error
        }
    }

    static async buscarTodas() {
        try {
            const [result] = await Pool.query(
                "SELECT id, estudiante, fecha_hora_entrevista, estado, responsable FROM solicitudes"
            )

            if (result.length === 0) {
                return false
            }
            else {
                const solicitudes = []
                result.forEach(s => {
                    solicitudes.push(new Solicitud(s))
                })
                return solicitudes
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
                "SELECT id, estudiante, fecha_hora_entrevista, estado, responsable FROM solicitudes WHERE id = ?",
                this.id
            )

            if (result.length === 0) {
                return false
            }
            else {
                this.id = result[0].id
                this.estudiante = result[0].estudiante
                this.fecha_hora_entrevista = result[0].fecha_hora_entrevista
                this.estado = result[0].estado
                this.responsable = result[0].responsable
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
                "INSERT INTO solicitudes(estudiante, fecha_hora_entrevista, estado, responsable) VALUES (?, ?, ?, ?)",
                [
                    this.estudiante,
                    this.fecha_hora_entrevista,
                    this.estado,
                    this.responsable
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
                "UPDATE solicitudes SET estudiante = ?, fecha_hora_entrevista = ?, estado = ?, responsable = ? WHERE id = ?",
                [
                    this.estudiante,
                    this.fecha_hora_entrevista,
                    this.estado,
                    this.responsable,
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
                "DELETE FROM solicitudes WHERE id = ?",
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
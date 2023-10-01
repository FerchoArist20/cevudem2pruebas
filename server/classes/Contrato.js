import { Pool } from '../db.js'

export class Contrato {
    constructor(c) {
        this.id = c.id ? c.id : null
        this.estudiante = c.estudiante ? c.estudiante : null
        this.fecha_inicio = c.fecha_inicio ? c.fecha_inicio : null
        this.fecha_fin = c.fecha_fin ? c.fecha_fin : null
        this.apartamento = c.apartamento ? c.apartamento : null
        this.estado = c.estado ? c.estado : null
        this.observaciones = c.observaciones ? c.observaciones : null
        this.responsable = c.responsable ? c.responsable : null
    }

    static async contarTodos() {
        try {
            const [result] = await Pool.query(
                "SELECT COUNT(*) as num FROM contratos"
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
                "SELECT id, estudiante, fecha_inicio, fecha_fin, apartamento, estado, observaciones, responsable FROM contratos"
            )

            if (result.length === 0) {
                return false
            }
            else {
                const contratos = []
                result.forEach(c => {
                    contratos.push(new Contrato(c))
                })
                return contratos
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
                "SELECT id, estudiante, fecha_inicio, fecha_fin, apartamento, estado, observaciones, responsable FROM contratos WHERE id = ?",
                this.id
            )

            if (result.length === 0) {
                return false
            }
            else {
                this.id = result[0].id
                this.estudiante = result[0].estudiante
                this.fecha_inicio = result[0].fecha_inicio
                this.fecha_fin = result[0].fecha_fin
                this.apartamento = result[0].apartamento
                this.estado = result[0].estado
                this.observaciones = result[0].observaciones
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
                "INSERT INTO contratos(estudiante, fecha_inicio, fecha_fin, apartamento, estado, observaciones, responsable) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [
                    this.estudiante,
                    this.fecha_inicio,
                    this.fecha_fin,
                    this.apartamento,
                    this.estado,
                    this.observaciones,
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
                "UPDATE contratos SET estudiante = ?, fecha_inicio = ?, fecha_fin = ?, apartamento = ?, estado = ?, observaciones = ?, responsable = ? WHERE id = ?",
                [
                    this.estudiante,
                    this.fecha_inicio,
                    this.fecha_fin,
                    this.apartamento,
                    this.estado,
                    this.observaciones,
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
                "DELETE FROM contratos WHERE id = ?",
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
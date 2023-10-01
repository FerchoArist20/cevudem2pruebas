import { Pool } from '../db.js'

export class Reserva {
    constructor(r) {
        this.id = r.id ? r.id : null
        this.socio = r.socio ? r.socio : null
        this.fecha_hora_inicio = r.fecha_hora_inicio ? r.fecha_hora_inicio : null
        this.fecha_hora_fin = r.fecha_hora_fin ? r.fecha_hora_fin : null
        this.habitacion = r.habitacion ? r.habitacion : null
        this.numero_agregados = r.numero_agregados ? r.numero_agregados : null
        this.estado = r.estado ? r.estado : null
    }

    static async contarTodas() {
        try {
            const [result] = await Pool.query(
                "SELECT COUNT(*) as num FROM reservas"
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
                "SELECT id, socio, fecha_hora_inicio, fecha_hora_fin, habitacion, numero_agregados, estado FROM reservas"
            )

            if (result.length === 0) {
                return false
            }
            else {
                const reservas = []
                result.forEach(r => {
                    reservas.push(new Reserva(r))
                })
                return reservas
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
                "SELECT id, socio, fecha_hora_inicio, fecha_hora_fin, habitacion, numero_agregados, estado FROM reservas WHERE id = ?",
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
                this.habitacion = result[0].habitacion
                this.numero_agregados = result[0].numero_agregados
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
                "INSERT INTO reservas(socio, fecha_hora_inicio, fecha_hora_fin, habitacion, numero_agregados, estado) VALUES (?, ?, ?, ?, ?, ?)",
                [
                    this.socio,
                    this.fecha_hora_inicio,
                    this.fecha_hora_fin,
                    this.habitacion,
                    this.numero_agregados,
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
                "UPDATE reservas SET socio = ?, fecha_hora_inicio = ?, fecha_hora_fin = ?, habitacion = ?, numero_agregados = ?, estado = ? WHERE id = ?",
                [
                    this.socio,
                    this.fecha_hora_inicio,
                    this.fecha_hora_fin,
                    this.habitacion,
                    this.numero_agregados,
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
                "DELETE FROM reservas WHERE id = ?",
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
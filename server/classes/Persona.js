import { Pool } from '../db.js'

export class Persona {
    constructor(p) {
        this.documento = p.documento ? p.documento : null
        this.tipo_documento = p.tipo_documento ? p.tipo_documento : null
        this.primer_nombre = p.primer_nombre ? p.primer_nombre : null
        this.segundo_nombre = p.segundo_nombre ? p.segundo_nombre : null
        this.primer_apellido = p.primer_apellido ? p.primer_apellido : null
        this.segundo_apellido = p.segundo_apellido ? p.segundo_apellido : null
        this.correo_electronico = p.correo_electronico ? p.correo_electronico : null
        this.telefono = p.telefono ? p.telefono : null
        this.rol = p.rol ? p.rol : null
    }

    static async buscarTodas() {
        try {
            const [result] = await Pool.query(
                "SELECT documento, tipo_documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo_electronico, telefono, rol FROM personas"
            )

            if (result.length === 0) {
                return false
            }
            else {
                const personas = []
                result.forEach(p => {
                    personas.push(new Persona(p))
                })
                return personas
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
                "SELECT documento, tipo_documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo_electronico, telefono, rol FROM personas WHERE documento = ?",
                this.documento
            )

            if (result.length === 0) {
                return false
            }
            else {
                this.documento = result[0].documento
                this.tipo_documento = result[0].tipo_documento
                this.primer_nombre = result[0].primer_nombre
                this.segundo_nombre = result[0].segundo_nombre
                this.primer_apellido = result[0].primer_apellido
                this.segundo_apellido = result[0].segundo_apellido
                this.correo_electronico = result[0].correo_electronico
                this.telefono = result[0].telefono
                this.rol = result[0].rol
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
                "INSERT INTO personas(documento, tipo_documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo_electronico, telefono, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    this.documento,
                    this.tipo_documento,
                    this.primer_nombre,
                    this.segundo_nombre,
                    this.primer_apellido,
                    this.segundo_apellido,
                    this.correo_electronico,
                    this.telefono,
                    this.rol
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

    async actualizar(documento) {
        try {
            const [result] = await Pool.query(
                "UPDATE personas SET documento = ?, tipo_documento = ?, primer_nombre = ?, segundo_nombre = ?, primer_apellido = ?, segundo_apellido = ?, correo_electronico = ?, telefono = ?, rol = ? WHERE documento = ?",
                [
                    this.documento,
                    this.tipo_documento,
                    this.primer_nombre,
                    this.segundo_nombre,
                    this.primer_apellido,
                    this.segundo_apellido,
                    this.correo_electronico,
                    this.telefono,
                    this.rol,
                    documento
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
                "DELETE FROM personas WHERE documento = ?",
                [
                    this.documento
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
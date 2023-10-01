import { Pool } from '../db.js'

export class Usuario {
    constructor(u) {
        this.documento = u.documento ? u.documento : null
        this.tipo_documento = u.tipo_documento ? u.tipo_documento : null
        this.primer_nombre = u.primer_nombre ? u.primer_nombre : null
        this.segundo_nombre = u.segundo_nombre ? u.segundo_nombre : null
        this.primer_apellido = u.primer_apellido ? u.primer_apellido : null
        this.segundo_apellido = u.segundo_apellido ? u.segundo_apellido : null
        this.correo_electronico = u.correo_electronico ? u.correo_electronico : null
        this.telefono = u.telefono ? u.telefono : null
        this.rol = u.rol ? u.rol : null
        this.clave = u.clave ? u.clave : null
        this.bloqueo = u.bloqueo ? u.bloqueo : 0
    }

    static async buscarTodos() {
        try {
            const [result] = await Pool.query(
                "SELECT documento, tipo_documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo_electronico, telefono, rol, bloqueo FROM usuarios ORDER BY bloqueo ASC"
            )

            if (result.length === 0) {
                return false
            }
            else {
                const usuarios = []
                result.forEach(u => {
                    usuarios.push(new Usuario(u))
                })
                return usuarios
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
                "SELECT documento, tipo_documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo_electronico, telefono, rol, bloqueo FROM usuarios WHERE documento = ?",
                [
                    this.documento
                ]
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
                this.bloqueo = result[0].bloqueo
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
                "INSERT INTO usuarios(documento, tipo_documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo_electronico, telefono, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
                "UPDATE usuarios SET documento = ?, tipo_documento = ?, primer_nombre = ?, segundo_nombre = ?, primer_apellido = ?, segundo_apellido = ?, correo_electronico = ?, telefono = ?, rol = ?, bloqueo = ? WHERE documento = ?",
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
                    this.bloqueo,
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

    async actualizarDocumento(documento) {
        try {
            const [result] = await Pool.query(
                "UPDATE usuarios SET documento = ?, tipo_documento = ? WHERE documento = ?",
                [
                    this.documento,
                    this.tipo_documento,
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

    async actualizarPersonales(documento) {
        try {
            const [result] = await Pool.query(
                "UPDATE usuarios SET primer_nombre = ?, segundo_nombre = ?, primer_apellido = ?, segundo_apellido = ?, correo_electronico = ?, telefono = ? WHERE documento = ?",
                [
                    this.primer_nombre,
                    this.segundo_nombre,
                    this.primer_apellido,
                    this.segundo_apellido,
                    this.correo_electronico,
                    this.telefono,
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

    async actualizarClave(documento) {
        try {
            const [result] = await Pool.query(
                "UPDATE usuarios SET clave = ? WHERE documento = ?",
                [
                    this.clave,
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

    async verificarNumeroDocumento() {
        try {
            const [result] = await Pool.query(
                "SELECT COUNT(*) as num FROM usuarios WHERE documento = ?",
                [
                    this.documento
                ]
            )

            return result[0].num === 1
        }
        catch (error) {
            console.log(error)
            return error
        }
    }

    async verificarCorreoElectronico() {
        try {
            const [result] = await Pool.query(
                "SELECT COUNT(*) as num FROM usuarios WHERE correo_electronico = ?",
                [
                    this.correo_electronico
                ]
            )

            return result[0].num === 1
        }
        catch (error) {
            console.log(error)
            return error
        }
    }

    async verificarDocumento() {
        try {
            const [result] = await Pool.query(
                "SELECT COUNT(*) as num FROM usuarios WHERE documento = ? AND tipo_documento = ?",
                [
                    this.documento,
                    this.tipo_documento
                ]
            )

            return result[0].num === 1
        }
        catch (error) {
            console.log(error)
            return error
        }
    }

    async verificarClave() {
        try {
            const [result] = await Pool.query(
                "SELECT COUNT(*) as num FROM usuarios WHERE documento = ? AND clave= ?",
                [
                    this.documento,
                    this.clave
                ]
            )

            return result[0].num === 1
        }
        catch (error) {
            console.log(error)
            return error
        }
    }

    async verificarBloqueo() {
        try {
            const [result] = await Pool.query(
                "SELECT bloqueo FROM usuarios WHERE documento = ?",
                [
                    this.documento
                ]
            )

            return result[0] ? result[0].bloqueo == 0 : false
        }
        catch (error) {
            console.log(error)
            return error
        }
    }

    async verificar() {
        try {
            const verifDocumento = await this.verificarDocumento()
            const verifClave = await this.verificarClave()
            const verifBloqueo = await this.verificarBloqueo()
            return [verifDocumento, verifClave, verifBloqueo]
        }
        catch (error) {
            console.log(error)
            return error
        }
    }
}
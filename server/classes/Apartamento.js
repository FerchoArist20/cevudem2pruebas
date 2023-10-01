import { Pool } from '../db.js'

export class Apartamento {
    constructor(a) {
        this.id = a.id ? a.id : null
        this.tipo = a.tipo ? a.tipo : null
        this.habilitado = a.habilitado ? a.habilitado : null
        this.disponible = a.disponible ? a.disponible : null
    }

    static async buscarTodos() {
        try {
            const [result] = await Pool.query(
                "SELECT id, tipo, habilitado, !EXISTS(SELECT * FROM contratos WHERE apartamento = apartamentos.id AND fecha_inicio <= CURRENT_DATE AND CURRENT_DATE <= fecha_fin) as disponible FROM apartamentos"
            )

            if (result.length === 0) {
                return false
            }
            else {
                const apartamentos = []
                result.forEach(a => {
                    apartamentos.push(new Apartamento(a))
                })
                return apartamentos
            }
        }
        catch (error) {
            console.log(error)
            return error
        }
    }
}
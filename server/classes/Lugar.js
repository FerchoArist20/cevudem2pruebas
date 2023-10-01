import { Pool } from '../db.js'

export class Lugar {
    constructor(l) {
        this.id = l.id ? l.id : null
        this.nombre = l.nombre ? l.nombre : null
        this.capacidad = l.capacidad ? l.capacidad : null
        this.habilitado = l.habilitado ? l.habilitado : null
        this.disponible =l.disponible ? l.disponible : null
    }

    static async buscarTodos() {
        try {
            const [result] = await Pool.query(
                "SELECT id, nombre, capacidad, habilitado, !EXISTS(SELECT * FROM eventos WHERE lugar = lugares.id AND fecha_hora_inicio < CURRENT_TIMESTAMP AND CURRENT_TIMESTAMP < fecha_hora_fin) as disponible FROM lugares"
            )

            if (result.length === 0) {
                return false
            }
            else {
                const lugares = []
                result.forEach(l => {
                    lugares.push(new Lugar(l))
                })
                return lugares
            }
        }
        catch (error) {
            console.log(error)
            return error
        }
    }
}
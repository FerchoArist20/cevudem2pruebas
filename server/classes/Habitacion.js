import { Pool } from '../db.js'

export class Habitacion {
    constructor(h) {
        this.id = h.id ? h.id : null
        this.capacidad = h.capacidad ? h.capacidad : null
        this.habilitada = h.habilitada ? h.habilitada : null
        this.disponible = h.disponible ? h.disponible : null
    }

    static async buscarTodas() {
        try {
            const [result] = await Pool.query(
                "SELECT id, capacidad, habilitada, !EXISTS(SELECT * FROM reservas WHERE habitacion = habitaciones.id AND fecha_hora_inicio < CURRENT_TIMESTAMP AND CURRENT_TIMESTAMP < fecha_hora_fin) as disponible FROM habitaciones"
            )

            if (result.length === 0) {
                return false
            }
            else {
                const habitaciones = []
                result.forEach(h => {
                    habitaciones.push(new Habitacion(h))
                })
                return habitaciones
            }
        }
        catch (error) {
            console.log(error)
            return error
        }
    }
}
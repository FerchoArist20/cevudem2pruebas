import { Router } from 'express'
import { Main } from '../classes/Main.js'

const router = Router()

const main = new Main()

router.get("/reservas-count", main.contarReservas)

router.get("/reservas", main.buscarReservas)

router.get("/reservas/:id", main.buscarReserva)

router.post("/reservas", main.insertarReserva)

router.put("/reservas/:id", main.actualizarReserva)

router.delete("/reservas/:id", main.eliminarReserva)

export default router
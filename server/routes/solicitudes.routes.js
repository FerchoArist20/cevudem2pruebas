import { Router } from 'express'
import { Main } from '../classes/Main.js'

const router = Router()

const main = new Main()

router.get("/solicitudes-count", main.contarSolicitudes)

router.get("/solicitudes", main.buscarSolicitudes)

router.get("/solicitudes/:id", main.buscarSolicitud)

router.post("/solicitudes", main.insertarSolicitud)

router.put("/solicitudes/:id", main.actualizarSolicitud)

router.delete("/solicitudes/:id", main.eliminarSolicitud)

export default router
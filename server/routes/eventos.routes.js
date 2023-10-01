import { Router } from 'express'
import { Main } from '../classes/Main.js'

const router = Router()

const main = new Main()

router.get("/eventos-count", main.contarEventos)

router.get("/eventos", main.buscarEventos)

router.get("/eventos/:id", main.buscarEvento)

router.post("/eventos", main.insertarEvento)

router.put("/eventos/:id", main.actualizarEvento)

router.delete("/eventos/:id", main.eliminarEvento)

export default router
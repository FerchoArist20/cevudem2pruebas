import { Router } from 'express'
import { Main } from '../classes/Main.js'

const router = Router()

const main = new Main()

router.get("/personas", main.buscarPersonas)

router.get("/personas/:documento", main.buscarPersona)

router.post("/personas", main.insertarPersona)

router.put("/personas/:documento", main.actualizarPersona)

router.delete("/personas/:documento", main.eliminarPersona)

export default router
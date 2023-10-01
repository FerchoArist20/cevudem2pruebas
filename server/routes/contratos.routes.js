import { Router } from 'express'
import { Main } from '../classes/Main.js'

const router = Router()

const main = new Main()

router.get("/contratos-count", main.contarContratos)

router.get("/contratos", main.buscarContratos)

router.get("/contratos/:id", main.buscarContrato)

router.post("/contratos", main.insertarContrato)

router.put("/contratos/:id", main.actualizarContrato)

router.delete("/contratos/:id", main.eliminarContrato)

export default router
import { Router } from 'express'
import { Main } from '../classes/Main.js'

const router = Router()

const main = new Main()

router.get("/apartamentos", main.buscarApartamentos)

export default router
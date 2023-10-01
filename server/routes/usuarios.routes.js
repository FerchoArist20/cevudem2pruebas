import { Router } from 'express'
import { Main } from '../classes/Main.js'

const router = Router()

const main = new Main()

router.get("/usuarios", main.buscarUsuarios)

router.get("/usuarios/:documento", main.buscarUsuario)

router.post("/usuarios", main.insertarUsuario)

router.put("/usuarios/:documento", main.actualizarUsuario)

router.put("/usuarios-doc/:documento", main.actualizarUsuarioDocumento)

router.put("/usuarios-per/:documento", main.actualizarUsuarioPersonales)

router.put("/usuarios-seg/:documento", main.actualizarUsuarioClave)

router.get("/usuarios-ver/:documento", main.verificarUsuarioNumeroDocumento)

router.post("/usuarios-ver-cor", main.verificarUsuarioCorreoElectronico)

router.post("/usuarios-ver-seg", main.verificarUsuarioClave)

router.post("/usuarios-ver", main.verificarUsuario)

export default router
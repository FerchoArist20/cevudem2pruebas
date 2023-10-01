import { PORT } from './config.js'
import express from 'express'
import cors from 'cors'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import usuariosRoutes from './routes/usuarios.routes.js'
import personasRoutes from './routes/personas.routes.js'
import reservasRoutes from './routes/reservas.routes.js'
import eventosRoutes from './routes/eventos.routes.js'
import solicitudesRoutes from './routes/solicitudes.routes.js'
import contratosRoutes from './routes/contratos.routes.js'
import lugaresRoutes from './routes/lugares.routes.js'
import habitacionesRoutes from './routes/habitaciones.routes.js'
import apartamentosRoutes from './routes/apartamentos.routes.js'

const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"]
}))

app.use(express.json())

app.use(usuariosRoutes)
app.use(personasRoutes)
app.use(reservasRoutes)
app.use(eventosRoutes)
app.use(solicitudesRoutes)
app.use(contratosRoutes)
app.use(lugaresRoutes)
app.use(habitacionesRoutes)
app.use(apartamentosRoutes)

app.use(express.static(join(__dirname, '../client/dist')))

app.listen(PORT)
console.log(`Server is running on http://localhost:${PORT}`)

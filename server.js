import express, {urlencoded} from 'express'
import cors from "cors"
import {client} from "./src/common/db.js";
import {routes as peliculaRoute} from "./src/pelicula/routes.js";
import {routes as actorRoutes} from "./src/actor/routes.js";

const PORTS = 3000 || 4000
const app = express()
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cors())
app.use('/api', peliculaRoute)
app.use('/api', actorRoutes)

app.get('/', (req, res) => {
    return res.status(200).send('Bienvenido al cine Iplacex')
})

await client.connect().then(() => {
        console.log('MongoDB connected')
        app.listen(PORTS, () => {
            console.log(`Server is running on port http:/localhost:${PORTS}`)
        })
    }
).catch((err) => {
    console.log('MongoDB error:', err)
})


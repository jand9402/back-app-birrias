import express from 'express'
import morgan from 'morgan'
//Routes
import birriasRoutes from "./routes/birrias.routes"

const app = express()

//settingd
app.set("port", 4000)

//middlewares
app.use(morgan("dev"))
app.use(express.json())

//Routes
app.use("/api/birrias", birriasRoutes)


export default app
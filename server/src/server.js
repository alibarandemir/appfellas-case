import express from 'express'
import cors from 'cors'
import FlightRouter from './routes/route.js'
import { connectDb } from './db/database.js'
const app= express()

app.use(express.json()); // JSON verilerini parse etmek için
app.use(cors({
    origin:'*'
}))
connectDb()
app.use('/',FlightRouter)
app.listen(5000,()=>{
    console.log("server is running")
})


import express from "express"
import * as dotnev from "dotenv"
import prisma from "./prisma"

dotnev.config()

const PORT = process.env.PORT ?? 3001

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

prisma.$connect()
.then(()=>  console.log("Database connectedS"))

app.listen(PORT, ()=> {
    console.log(`Server running at: ${PORT}`)
})

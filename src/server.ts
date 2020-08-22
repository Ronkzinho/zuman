import client from "./index"
import * as express from "express"

const app = express()

app.get("/guilds", (req, res) => {
    res.send(client.guilds.cache.map(c => c.id).toString())
})

app.listen(process.env.PORT || 3333, () => {
    console.log("Server startado!")
})
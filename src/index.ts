import "dotenv/config"
import Zuman from "./client"

const client = new Zuman()

client.login(process.env.TOKEN)

export default client
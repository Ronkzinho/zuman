import { command, runCommand } from "../utils/command";

export default abstract class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "ping"
        this.category = "utility"
    }
    async run({ message }: runCommand){
        const msg = await message.channel.send("Ping?")
        msg.edit(`Pong! ${msg.createdAt.getTime() - message.createdAt.getTime()}ms`)
    }
}
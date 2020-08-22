import { command, runCommand } from "../utils/command";

export default abstract class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "free"
        this.category = "fun"
        this.usage = [`${this.name}`]
        this.description = "Comando que manda as nossas hashstags favoritas!"
    }
    async run({ message }: runCommand){
        message.channel.send("#FreeJoso #FreeRonk #FreeLima")
    }
}
import { command, runCommand } from "../utils/command";

export default abstract class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "free"
        this.category = "fun"
    }
    async run({ message }: runCommand){
        message.channel.send("#FreeJoso #FreeRonk #FreeLima")
    }
}
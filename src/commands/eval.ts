import { command, runCommand } from "../utils/command";
import { MessageEmbed } from "discord.js";

export default abstract class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "eval"
        this.owner = true
    }
    async run({ message, args }: runCommand){
        try{
            const result = eval(args.join(' '))
            return message.channel.send(new MessageEmbed({
                title: "Resultado do eval:",
                description: result.toString(),
                color: message.member.displayColor
            }))
        }
        catch(error){
            return message.channel.send(error.toString())
        }
    }
}
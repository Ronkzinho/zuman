import { command, runCommand } from "../utils/command";
import { Embed } from "../utils/Classes";

export default abstract class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "eval"
        this.owner = true
    }
    async run({ message, args }: runCommand){
        try{
            const result = eval(args.join(' '))
            return message.channel.send(new Embed({
                title: "Resultado do eval:",
                description: result.toString(),
            }, message))
        }
        catch(error){
            return message.channel.send(error.toString())
        }
    }
}
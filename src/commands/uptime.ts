import { command, runCommand } from "../utils/command";
import { Embed } from "../utils/Classes";

export default abstract class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "uptime"
        this.aliases = ["u", "up", "upt"]
        this.manutencion = true
    }
    async run({ message }: runCommand){
        /*comando ainda em desenvolvimento*/
    }
}
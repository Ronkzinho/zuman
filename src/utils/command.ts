import Zuman from "../client"
import { Message } from "discord.js";

export interface commandIterface{
    name: string;
    client?: Zuman;
    aliases?: Array<string>;
    allowDm?: Boolean;
    category?: string | Array<string>;
    manutencion?: Boolean;
    owner?: Boolean;
    description?: string;
    usage?: Array<string>;
    hidden?: Boolean;
    run({ message, args, pJ }: runCommand): any
}
export interface runCommand{
    message: Message
    args: Array<string>
    pJ: Zuman["parseJson"]
}
export class command implements commandIterface{
    name;
    client: Zuman;
    aliases;
    allowDm;
    category;
    manutencion;
    owner;
    description;
    usage;
    hidden;
    constructor(name, client){
        this.name = name
        this.client = client
        this.allowDm = false
        this.manutencion = false
        this.hidden = false
        this.owner = false
        this.description = null
        this.category = null
        this.aliases = []
        this.usage = []
    }
    run(options: runCommand){ }
}
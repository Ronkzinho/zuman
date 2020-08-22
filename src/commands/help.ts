import { command, runCommand } from "../utils/command";
import {categorys } from "../utils/categorys";

export default abstract class extends command{
    initialEmojis: Array<string>
    categorysEmojis: Array<string>
    commandsEmojis: Array<string>
    constructor(name, client){
        super(name, client)
        this.name = "help"
        this.category = "fun"
        this.initialEmojis = ["📂"]
        this.categorysEmojis = ["◀️", "❌", ...categorys.map(c => c.emoji)]
        this.commandsEmojis = ["◀️", "❌"]
    }
    async run({ message, args }: runCommand){
        var helpClass = new this.client.classes.Help(this, this.client)
        if(args[0]){
            var { msg, error } = await helpClass.sendCommandHelp(message, args)
            if(error) return message.channel.send(error)
            await msg.react("❌")
            var collector = await helpClass.createCollector(message, msg, ["❌"])   
            collector.on("collect", () => helpClass.deleteAll(message, msg))
        }
        else{
            var { msg } = await helpClass.sendIntialEmbed(message)
            this.initialEmojis.map(async (emoji) => await msg.react(emoji))
            const intialCollector = helpClass.createCollector(message, msg, this.initialEmojis.filter(e => !this.commandsEmojis.includes(e)))
            intialCollector.on("collect", async () => {
                await helpClass.sendCategorysEmbed(message, msg)
                await msg.reactions.removeAll()
                this.categorysEmojis.map(async (emoji) => {
                    await msg.react(emoji)
                })
                const categorysCollector = helpClass.createCollector(message, msg, this.categorysEmojis.filter(e => !this.commandsEmojis.includes(e)))
                categorysCollector.on("collect", async (reaction) => {
                    await helpClass.sendCommandsEmbed(message, msg, categorys.find(c => c.emoji === reaction.emoji.name))
                    await msg.reactions.removeAll()
                    this.commandsEmojis.map(async (emoji) => {
                        await msg.react(emoji)
                    })
                })
            })
        }
    }
}
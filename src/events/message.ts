import { Message } from "discord.js"
import Zuman from "../client"
import client from "src"

export default async function(this: Zuman, message: Message){
    if(message.author.bot) return
    if(message.content.startsWith(`<@${this.user.id}>`) || message.content.startsWith(`<@!${this.user.id}`)) return message.channel.send(eval('`' + this.messages.client.mention + '`'))
    if(!message.content.startsWith(this.prefix)) return
    var args = message.content.slice(this.prefix.length).split(/ +/g)
    var command = args.shift()!.toLowerCase()!
    var commandFile = this.commands.find(cmd => cmd.name === command || cmd.aliases.includes(command))
    message.reactions.removeAll()
    if(commandFile){
        if(!commandFile.allowDm && message.channel.type === "dm" || ((commandFile.manutencion || commandFile.owner) && !this.owners.includes(message.author.id))) return
        var { prefix } = this
        commandFile.run({ message, args, prefix })
    }
    else{
        await message.react("❓")
        var collector = await message.createReactionCollector((reaction, user) => user.id === message.author.id && reaction.emoji.name === "❓", { time: 30000, max: 1 })
        collector.on("collect", () => {
            message.channel.send(this.errors.command.notFoundCommand.replace("{prefix}", this.prefix).replace("{command}", command))
        })
    }
}
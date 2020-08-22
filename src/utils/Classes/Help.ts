import { MessageEmbed, Message } from "discord.js"
import { runCommand } from "../command"
import help from "../../commands/help"
import { categorys, categorysInterface } from "../categorys"

export default class extends help{
    level: number
    constructor(name, client){
        super(name, client)
        this.level = 0
    }
    async sendIntialEmbed(message: Message, msg?: Message){
        const initialEmbed = new MessageEmbed({
            title: `Olá ${message.author.username}, tudo bem?`,
            description: `Eu tenho ${this.client.commands.filter(c => !c.owner && !c.hidden).size} comandos!\n` + 
            `Para receber ajuda de um comando específico digite: \`${this.client.prefix + this.name}\``,
            color: message.member.displayColor
        })
        msg = msg ? await msg.edit(initialEmbed) : await message.channel.send(initialEmbed)
        this.initialEmojis.map(async (emoji) => {
            await msg.react(emoji)
        })
        this.level === 0 ? this.level++ : ""
        return { msg, initialEmbed }
    }
    async sendCategorysEmbed(message: Message, msg: Message){
        const categorysEmbed = new MessageEmbed({
            title: `Categorias:`,
            description: `${categorys.map(category => `${category.emoji} - ${category.translation}: ${this.client.filteredCommands.filter(c => c.category === category.name).size}`).join("\n")}`,
            color: message.member.displayColor
        })
        await msg.reactions.removeAll()
        this.categorysEmojis.map(async (emoji) => {
            await msg.react(emoji)
        })
        await msg.edit(categorysEmbed)
        this.level === 1 ? this.level++ : ""
        return { categorysEmbed }
    }
    async sendCommandsEmbed(message: Message, msg: Message, category: categorysInterface){
        const commandsEmbed = new MessageEmbed({
            title: `${category.translation}:`,
            description: `${this.client.filteredCommands.filter(c => c.category === category.name).map(command => `\`${this.client.prefix + command.name}\` - ${command.description ? command.description : "Sem descrição aparente!"}`).join("\n") || "Nenhum comando possui essa categoria!"}`,
            color: message.member.displayColor
        })
        await msg.reactions.removeAll()
        this.goBackOrDelete.map(async (emoji) => {
            await msg.react(emoji)
        })
        await msg.edit(commandsEmbed)
        this.level === 2 ? this.level++ : ""
        return { commandsEmbed }
    }
    createCollector(message: Message, msg: Message, emojis: Array<string>){
        return msg.createReactionCollector((reaction, user) => user.id === message.author.id && emojis.includes(reaction.emoji.name), { time: 60000 })
    }
    async sendCommandHelp(message: Message, args: runCommand["args"]){
        const command = this.client.filteredCommands.find(c => c.name === args[0] || c.aliases.includes(args[0]))
        if(!command) return { error: this.client.errors.help.invalidCommandName }
        else{
            const commandHelpEmbed = new MessageEmbed({
                title: `${this.client.prefix + command.name}`,
                description: `${command.description ? command.description : "Sem descrição aparente!"}`,
                fields: [
                    {
                        name: "Outros nomes:",
                        value: `\`\`\`${command.aliases.length > 0 ? `${this.client.prefix}[${command.aliases.join("|")}]` : `Sem outros nomes!`}\`\`\``
                    },
                    {
                        name: "Como usar:",
                        value: `\`\`\`${command.usage.length > 0 ? command.usage.map(usage => this.client.prefix + usage).join("\n") : "Sem exemplos!"}\`\`\``
                    },
                    {
                        name: "Categoria:",
                        value: `\`\`\`${categorys.find(c => c.name === command.category).translation}\`\`\``
                    },
                    {
                        name: "Disponivel no privado:",
                        value: `\`\`\`${command.allowDm ? "Sim" : "Não"}\`\`\``
                    }
                ],
                color: message.member.displayColor
            })
            return { msg: await message.channel.send(commandHelpEmbed), commandHelpEmbed }
        }
    }
    async deleteAll(message: Message, msg: Message){
        msg.delete()
        message.channel.send("Ok...").then(m => m.delete({ timeout: 5000 }))
        message.delete()
    }
    async goBack(message: Message, msg: Message){
        this.level--
        await msg.reactions.removeAll()
        if(this.level === 1){
            this.sendIntialEmbed(message, msg)
        }
        else if(this.level === 2){
            this.sendCategorysEmbed(message, msg)
        }
    }
}
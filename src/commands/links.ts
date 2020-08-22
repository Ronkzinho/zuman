import { command, runCommand } from "../utils/command";
import { MessageEmbed } from "discord.js";

export default abstract class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "links"
        this.aliases = ["l"]
        this.allowDm = true
        this.category = "utility"
        this.description = "Comando para que você possa ver os links relacionados ao bot!"
        this.usage = [`${this.name}`]
    }
    async run({ message }: runCommand){
        var embed = new MessageEmbed({
            title: `Olá, ${this.client.owners.includes(message.author.id) ? "dono, como está seu dia?" : message.author.username + ", tudo bem?"}`,
            description: `${this.client.messages.links.desciption.replace("{owner1}", this.client.owners[0]).replace("{owner2}", this.client.owners[1])}`,
            fields: [
                {
                    name: "Convite o bot para o seu servidor:",
                    value: `[Clique aqui](${this.client.inviteLink})`
                },
                {
                    name: "Código fonte do bot:",
                    value: `[Clique aqui](${this.client.gitHubRepository})`
                }
            ],
            color: message.member.displayColor
        })
        message.channel.send(embed)
    }
}
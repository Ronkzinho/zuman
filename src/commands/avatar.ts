import { command, runCommand } from "../utils/command";
import fetch from "node-fetch"
import { Embed } from "../utils/Classes";

export default abstract class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "avatar"
        this.aliases = ["a", "av"]
        this.usage = [`${this.name}`, `${this.name} <usuário>`]
        this.description = "Comando que mostra o avatar de um usuário!"
        this.category = "utility"
    }
    async run({ message, args }: runCommand){
        const user = args[0] ? message.mentions.users.first() ? message.mentions.users.first() : this.client.users.cache.get(args.join(' ')) ? this.client.users.cache.get(args.join(' ')) : this.client.users.cache.find(user => user.username.toLowerCase() === args.join(' ').toLowerCase()) ? this.client.users.cache.find(user => user.username.toLowerCase() === args.join(' ').toLowerCase()) : this.client.users.cache.find(user => user.tag.toLowerCase() === args.join(' ').toLowerCase()) ? this.client.users.cache.find(user => user.tag.toLowerCase() === args.join(' ').toLowerCase()) : message.guild.members.cache.find(user => user.displayName.toLowerCase() === args.join(' ').toLowerCase()) ? message.guild.members.cache.find(user => user.displayName.toLowerCase() === args.join(' ').toLowerCase()).user : message.guild.members.cache.find(user => user.displayName.toLowerCase().includes(args.join(' ').toLowerCase())) ? message.guild.members.cache.find(user => user.displayName.toLowerCase().includes(args.join(' ').toLowerCase())).user : this.client.users.cache.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase())) ? this.client.users.cache.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase())) : message.author : message.author
        let avatar = user.displayAvatarURL()
        avatar = `${user.displayAvatarURL()}?size=2048`
        let gifAvatar;
        if(avatar.includes(".webp")){
        const { status } = await fetch(avatar.replace(".webp", ".gif"))
            if(status === 415){
                    gifAvatar = avatar
            }
            else{
                gifAvatar = avatar.replace(".webp", ".gif")
            }
        }
        const embed = new Embed({
            title: `Avatar de ${user.username}`,
            description: `**Clique [aqui](${avatar}) para baixar a imagem!**`,
            image: { url: gifAvatar },
        }, message)
        message.channel.send(embed)
    }
}
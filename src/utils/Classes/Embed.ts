import { MessageEmbed, Message, MessageEmbedOptions } from "discord.js";
import Zuman from "../../client";

export default class Embed extends MessageEmbed{
    client: Zuman
    constructor(options: MessageEmbedOptions = {}, message?: Message){
        super(options)
        message && this.setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        message && this.setTimestamp()
        message && this.setColor(message.member.displayColor)
    }
}
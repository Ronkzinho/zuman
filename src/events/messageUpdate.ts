import Zuman from "src/client";
import { Message } from "discord.js";

export default async function(this: Zuman, oldMessage: Message, newMessage: Message){
    newMessage.createdTimestamp = newMessage.editedTimestamp
    this.emit("message", newMessage)
}
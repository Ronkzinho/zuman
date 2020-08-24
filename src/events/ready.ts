import Zuman from "../client";

export default async function(this: Zuman){
    this.filteredCommands = this.commands.filter(c => !c.hidden && !c.owner && !c.manutencion)
    this.inviteLink = `https://discord.com/oauth2/authorize?client_id=${this.user.id}&scope=bot&permissions=8`
    this.user.setPresence({ activity: { name: this.parseJson(this.messages.client.presence, [{ prefix: this.prefix }])}})
    console.log(`${this.user.username} online`)
}
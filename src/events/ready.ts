import Zuman from "../client";

export default async function(this: Zuman){
    this.filteredCommands = this.commands.filter(c => !c.hidden && !c.owner && !c.manutencion)
    this.user.setPresence({ activity: { name: "n sei '-'" } })
}
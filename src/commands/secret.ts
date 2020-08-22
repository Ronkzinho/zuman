import { command, runCommand } from "../utils/command";

export default abstract class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "secret"
        this.hidden = true
    }
    async run({ message }: runCommand){
        const aswers: Array<{ percentage: number, text: string }> = [{ percentage: 0.99, text: "c ta em shock pae?" }, { percentage: 0.01, text: "slk" }]
        const random: number = Math.random()

        const myArr = aswers.sort((f, s) => f.percentage - s.percentage)

        for(let item of myArr) {
            if(random <= item.percentage) {
                return message.channel.send(item.text)
            }
        }
    }
}
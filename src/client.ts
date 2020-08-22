import { Client, Collection, User } from "discord.js"
import { commandIterface } from "./utils/command"
import { readdirSync, statSync } from "fs"
import * as errors from "./errors.json"
import * as messages from "./messages.json"
import { Classes } from "./utils"
import * as path from "path"

export default class Zuman extends Client{
    commands: Collection<string, commandIterface>
    filteredCommands: Collection<string, commandIterface>
    owners: Array<User["id"]>
    prefix: string
    errors: typeof errors
    messages: typeof messages
    classes: { Help: typeof Classes["Help"] }
    constructor(options = {}){
        super(options)
        this.commands = new Collection()
        this.filteredCommands = new Collection()
        this.owners = ["370007502643003403", "497920049407852545"]
        this.errors = errors
        this.messages = messages
        this.classes = { Help: Classes.Help }
        this.prefix = "ctes?"
        this.initializeEvents(path.resolve(__dirname, "events"))
        this.initializeCommands(path.resolve(__dirname, "commands"))
    }
    async initializeCommands(path){
        readdirSync(path).forEach(async file => {
            try {
                const filePath = path + '/' + file
                if (file.endsWith('.ts') || file.endsWith(".js")){
                    const Command = (await import(filePath.replace("/src", ""))).default
                    const commandName = file.replace(/.ts|.js/g,'').toLowerCase()
                    const command = new Command(commandName, this)
                    this.commands.set(commandName, command)
                } else if (statSync(filePath).isDirectory()) {
                    this.initializeCommands(filePath)
                }
            } catch (error) {
                console.log(error)
            }
        })
    }
    async initializeEvents(path){
        readdirSync(path).forEach(async file => {
            try {
                let filePath = path + '/' + file
                if (file.endsWith('.ts') || file.endsWith(".js")) {
                    const listener = (await import(filePath.replace("/src", ""))).default
                    const eventName = file.replace(/.ts|.js/g, '')
                    // @ts-ignore
                    this.on(eventName, listener.bind(this))
                } else if (statSync(filePath).isDirectory()) {
                    this.initializeEvents(filePath)
                }
            } catch (error) {
                console.log(error)
            }
        })
    }
}
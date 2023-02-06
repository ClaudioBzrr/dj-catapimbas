import { Message } from "discord.js";

export interface UserMessage{
    name:string,
    run:(message:Message) => void
}
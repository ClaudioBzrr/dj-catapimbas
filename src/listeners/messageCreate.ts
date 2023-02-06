import { Client } from "discord.js";
import { UserMessages } from "../UserMessages";

export default (client: Client): void => {
    client.on('messageCreate', async (message) => {
        if (!client.user || !client.application)return
        if(!message.content.startsWith('!'))return

        const messageName =  message.content.slice(1).split(' ')[0]

        const messageRegistered = UserMessages.find( message => message.name == messageName)

        if(messageRegistered){
            messageRegistered.run(message)
        }else{
            message.reply('Commando não encontrado')
        }
        
    });
};
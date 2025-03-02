import { addAliases} from 'module-alias'

addAliases({
    "@": __dirname,
})

import {REST, Routes, Client, Events, GatewayIntentBits} from 'discord.js'
import { DISCORD_CLIENT_ID, DISCORD_TOKEN } from '@/envs'



export async function refreshSlashCommands(){

    const commands = [
        {
            name:'ping',
            description:'Replies with Pong!'
        }
    ]
    
    const rest = new REST({version:'10'}).setToken(DISCORD_TOKEN)
    
    
    try{
        console.log('Started refreshing application (/) commands.')
    
        await rest.put(
            Routes.applicationCommands(DISCORD_CLIENT_ID),{body:commands}
        )
        console.log('Successfully reloaded application (/) commands.')
    }catch(err){
        console.error(err)
    }
}


const client = new Client({intents: [GatewayIntentBits.Guilds]})

client.on(Events.InteractionCreate, async interaction =>{
    if(!interaction.isChatInputCommand()) return 
    if(interaction.commandName === 'ping'){
        await interaction.reply('Pong!')
    }
})

client.login(DISCORD_TOKEN)
refreshSlashCommands()
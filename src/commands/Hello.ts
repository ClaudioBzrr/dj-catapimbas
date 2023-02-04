import { CommandInteraction, Client, ApplicationCommandType } from 'discord.js'
import { Command } from '../Command'


export const Hello:Command = {
    name:'ola',
    description:'diz oi',
    type:ApplicationCommandType.ChatInput,
    run:async(client, interaction)=> {
        const content = "Olá pessoal"

        await interaction.followUp({
            ephemeral:true,
            content
        })

    },

}
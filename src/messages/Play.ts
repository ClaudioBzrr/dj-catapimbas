import { UserMessage } from "../UserMessage";
import { joinVoiceChannel, createAudioPlayer,createAudioResource} from '@discordjs/voice'
import ytdl from "ytdl-core";

export const Play:UserMessage={
    name:'play',
    run:(message)=>{
        const arg = message.content.slice(1).split(" ")[1]
        const url = arg.toLowerCase()
        const voiceChannel =  message.member!.voice.channel

        if(!arg) return
        if(!arg.startsWith('https://www.youtube') ||!arg.startsWith('https://youtu.be')) return
        if(!voiceChannel) return

        try{
            const connection =  joinVoiceChannel({
                channelId:voiceChannel!.id,
                guildId:message.member!.guild.id,
                adapterCreator:voiceChannel!.guild.voiceAdapterCreator
            })
            const stream =  createAudioResource(ytdl(url,{filter:'audioonly'}))
            const player =  createAudioPlayer()
            connection.subscribe(player)
            player.play(stream)
            player.on('unsubscribe',() => connection.destroy())


        }catch(err){
            console.log(err)
            message.reply(`Não consegui tocar a música ${url}`)
        }


    }
}
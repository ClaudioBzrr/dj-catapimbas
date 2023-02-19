// import { Client} from 'discord.js';
// import 'dotenv/config'
// import ready from './listeners/ready';
// // import interactionCreate from './listeners/interactionCreate';
// import messageCreate from './listeners/messageCreate';

// const token = `${process.env.DISCORD_KEY}`
// const client = new Client({
//   intents:[]
// });


// ready(client)
// // interactionCreate(client)
// messageCreate(client)
// client.login(token);

import { Client} from 'discord.js';
import 'dotenv/config'
import { createAudioPlayer, joinVoiceChannel, createAudioResource, StreamType, AudioPlayer, AudioPlayerStatus } from '@discordjs/voice';
import ytdl from 'ytdl-core';

const client = new Client({ intents: [] });

client.on('messageCreate', async message => {
    if (!message.guildId) return;
    const { content } = message;
    if (content.startsWith("!play")) {
        const url = content.split(" ")[1]
        const channel = message.member!.voice.channel;
        if (channel != null) {
            let player = createAudioPlayer();
            const connection = joinVoiceChannel({
                channelId: channel!.id,
                guildId: channel!.guild.id,
                adapterCreator: message.guild!.voiceAdapterCreator,
            });
            connection.subscribe(player);
            playSound(url,player);
            player.on(AudioPlayerStatus.Idle, () =>{
                playSound(url,player);
            });
        }
        else {
            await message.reply({ content: "You are not in a voice channel." });
            return;   
        }
    }
});

function playSound(songUrl:string,player: AudioPlayer){
	let resource = createAudioResource(ytdl(songUrl,{filter:'audioonly'}), {
		inputType: StreamType.Arbitrary
	});
	player.play(resource);
}

client.once('ready', () => {
    console.log('Bot is Ready.');
});

client.login(process.env.DISCORD_KEY);
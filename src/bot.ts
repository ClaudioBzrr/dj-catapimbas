import { Client} from 'discord.js';
import 'dotenv/config'
import ready from './listeners/ready';
// import interactionCreate from './listeners/interactionCreate';
import messageCreate from './listeners/messageCreate';

const token = `${process.env.DISCORD_KEY}`
const client = new Client({
  intents:[]
});


ready(client)
// interactionCreate(client)
messageCreate(client)

client.login(token);
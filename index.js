const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { Player } = require('discord-player');
const express = require('express');
require('dotenv').config();
const ytdl = require('ytdl-core');
const { DisTube } = require('distube');

const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => {
    return GatewayIntentBits[a];
  }),
});

const prefixData = require('./prefix.json');
const prefix = prefixData.prefix;
const config = require('./config.json');

const youtubeApiKey = config.youtubeAPIKey;


const app = express();
const port = 3000;
app.get('/', (req, res) => {
  const imagePath = path.join(__dirname, 'index.html');
  res.sendFile(imagePath);
});
app.listen(port, () => {
  console.log(`🔗 http://localhost:${port}`);
});

client.commands = new Map();

const musicCommandsPath = path.join(__dirname, 'musicCommands');


const musicCommandFiles = fs.readdirSync(musicCommandsPath).filter((file) => file.endsWith('.js'));



for (const file of musicCommandFiles) {
  const command = require(path.join(musicCommandsPath, file));
  client.commands.set(command.name, command);
}

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }
});


async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log('\x1b[32m%s\x1b[0m', '|    Luan is Gay!');
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', 'Restarting Process...');
    process.kill(1);
  }
}


client.once('ready', () => {
  setTimeout(() => {
    console.log('\x1b[32m%s\x1b[0m', `|    🎯 Activity sucessfully set!`);
    client.user.setPresence({
      activities: [{ name: `Update Out V@1.5`, type: ActivityType.Watching }],
      status: 'idle',
    });
  }, 2000); 
});


login();


setInterval(() => {
  if (!client || !client.user) {
    console.log('\x1b[31m%s\x1b[0m', '❌ Client Not Logged in, Restarting Process...');
    process.kill(1);
  }
}, 15000);

module.exports = client;


/*

*/

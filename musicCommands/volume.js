
const { EmbedBuilder } = require('discord.js');
const { getPlayer } = require('./play');

module.exports = {
  name: 'volume',
  description: 'Adjust the volume of the bot',
  execute: async (message, args) => {
    const volume = parseFloat(args[0]);

    if (isNaN(volume) || volume < 0 || volume > 100) {
      return message.reply('❌ Please provide a valid volume level between 0 and 100.');
    }
    const player = getPlayer();

    if (!player) {
      return message.reply('❌ No music is currently playing.');
    }
    const resource = player.state.resource;

    if (!resource) {
      return message.reply('❌ No audio resource found.');
    }
    resource.volume.setVolume(volume / 100);

    const embed = new EmbedBuilder()
      .setColor('#2b71ec')
     .setAuthor({
          name: 'Volume Control!',
          iconURL: 'https://cdn.discordapp.com/attachments/821165280612319262/1230291345382314065/ryan.png?ex=6632c91a&is=6620541a&hm=deb2ac5108359a5878c6172c5dbab79171aabe75d3fd5a998069219068eaae57&',
        })
      .setDescription(`**volume engaged to ${volume}%**`);

    message.reply({ embeds: [embed] });
  },
};

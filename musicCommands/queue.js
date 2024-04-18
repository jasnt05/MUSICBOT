
const { EmbedBuilder } = require('discord.js'); 
const { queue } = require('./play');

module.exports = {
  name: 'queue',
  description: 'Show the songs in the queue.',
  execute(message) {
    if (queue.length === 0) {
      const embed = new EmbedBuilder()
      .setAuthor({
          name: 'Attention',
          iconURL: 'https://cdn.discordapp.com/attachments/821165280612319262/1230291345382314065/ryan.png?ex=6632c91a&is=6620541a&hm=deb2ac5108359a5878c6172c5dbab79171aabe75d3fd5a998069219068eaae57&',
        })
      .setDescription('**The Queue is currently empty**')
      .setColor('#ff0000');
    return message.reply({ embeds: [embed] });
    }

    const embed = new EmbedBuilder()
      .setColor('#2b71ec')
     .setAuthor({
          name: 'Queue',
          iconURL: 'https://cdn.discordapp.com/attachments/821165280612319262/1230291345382314065/ryan.png?ex=6632c91a&is=6620541a&hm=deb2ac5108359a5878c6172c5dbab79171aabe75d3fd5a998069219068eaae57&',
        })
      .setDescription(queue.map((song, index) => `**${index + 1}.** ${song.searchQuery}`).join('\n'));

    message.reply({ embeds: [embed] });
  },
};

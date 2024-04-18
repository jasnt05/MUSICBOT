const { joinVoiceChannel, VoiceConnectionStatus } = require('@discordjs/voice');
const { EmbedBuilder } = require('discord.js');
const { dequeue, playNextSong, playSong } = require('./play');
const { queue } = require('./play');

module.exports = {
  name: 'skip',
  description: 'Skip the current song',
  async execute(message, args) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setDescription('You need to be in a voice channel to use this command!');
      return message.reply({ embeds: [embed] });
    }

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    if (connection.state.status === VoiceConnectionStatus.Ready) {
      if (queue.length > 0) {
        const nextSong = dequeue();
        await playSong(connection, nextSong.searchQuery, nextSong.message);

        const embed = new EmbedBuilder()
           .setColor('#2b71ec')
     .setAuthor({
          name: 'Skipped Song!',
          iconURL: 'https://cdn.discordapp.com/attachments/821165280612319262/1230291345382314065/ryan.png?ex=6632c91a&is=6620541a&hm=deb2ac5108359a5878c6172c5dbab79171aabe75d3fd5a998069219068eaae57&',
        })
          .setDescription('**Let\'s move on to the next beat...**');
        return message.reply({ embeds: [embed] });
      } else {
        const embed = new EmbedBuilder()
          .setColor('#FFFF00')
          .setDescription('**❌ No songs in the queue to skip.**');
        return message.reply({ embeds: [embed] });
      }
    } else {
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setDescription('**❌ There is no song to skip. Queue is empty.**');
      return message.reply({ embeds: [embed] });
    }
  },
};

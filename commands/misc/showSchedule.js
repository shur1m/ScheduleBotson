const data = require('../../data');

module.exports = {
    commands: ['showSchedule', 'showsched', 'show'],
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
            .setTitle("Scheduled Messages")
            .setColor('#F5C4FF')
            .setFooter('Use \'!deleteschedule\' or \'!delete\' to remove scheduled messages');

        let index = 0;
        for (element of data.scheduledMessages){
            if (element.guild == message.guild.id){
                let messageText = element.content;
                let messageId = element.uuid;

                if (messageText.length > 170) {
                    messageText = element.content.substring(0, 170) + '...';
                }

                embed.addFields({
                    name: messageText,
                    value: `Message ID: ${messageId} \nScheduled Time: ${element.dateAndTime}`,
                    inline: false
                })

                index++;
            }
        }
        
        message.channel.send(embed);
    },
    permissions: [],
    requiredRoles: [],
}
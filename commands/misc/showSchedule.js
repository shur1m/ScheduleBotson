const data = require('../../data');

module.exports = {
    commands: ['showSchedule', 'showsched'],
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
            .setTitle("Scheduled Messages")
            .setColor('#F5C4FF')

        let index = 0;
        for (element of data.scheduledMessages){
            embed.addFields(
                {
                    name: element.content,
                    value: `Message ID: ${index} \nScheduled Time: ${element.dateAndTime}`,
                    inline: false
                }
            )

            index++;
        }
        
        message.channel.send(embed);
        console.log(embed);
    },
    permissions: [],
    requiredRoles: [],
}
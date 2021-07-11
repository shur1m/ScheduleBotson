//creates menu that allows deleting scheduled messages

const data = require('../../data');
const disbut = require('discord-buttons');
const Discord = require('discord.js');

module.exports = {
    commands: ['deleteSchedule', 'delsched'],
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        if (data.scheduledMessages.length === 0){
            message.reply("There are no scheduled messages to delete.");
            return;
        }

        createMenu(message);
    },
    permissions: [],
    requiredRoles: [],
}

//creates menu
function createMenu(message){
    let options = [];

    //adding options
    for (let i = 0; i < data.scheduledMessages.length; i++){
        let optionValue = `sched${i}`;
        let optionLabel = data.scheduledMessages[i].content
        optionLabel = (optionLabel.length > 25) ? optionLabel.substring(0, 22) + '...' : optionLabel

        options[i] = new disbut.MessageMenuOption()
        options[i]
            .setLabel(optionLabel)
            .setValue(optionValue)
            .setDescription(data.scheduledMessages[i].dateAndTime)
            .setDefault()
    }

    let select = new disbut.MessageMenu()
        .setID('deleteMenu')
        .setPlaceholder('Select Message'); //optional
    
    for (element of options){
        select.addOption(element);
    }

    let delButton = new disbut.MessageButton()
        .setStyle('red')
        .setLabel('Delete') //default: NO_LABEL_PROVIDED
        .setID('deleteSchedule')

    message.channel.send('✤', select);
    message.channel.send('Select the message you wish to delete, then press "Delete"', delButton);
}
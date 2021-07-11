const data = require('../../data');
const disbut = require('discord-buttons');

module.exports = {
    buttonID: 'deleteSchedule',
    type: 'button',
    permissionError: 'You do not have permission to run this command.',
    permissions: [],
    requiredRoles: [],
    callback: (button, client) => {
        message = button.message;
        let delButton = new disbut.MessageButton()
        .setStyle('blurple')
        .setLabel('Delete') //default: NO_LABEL_PROVIDED
        .setID('deleteSchedule')

        /*option = new disbut.MessageMenuOption()
            .setLabel("Something")
            .setValue('something')
            .setDescription("something else")
            .setDefault()
        
        let select = new disbut.MessageMenu()
            .setID('deleteMenu')
            .setPlaceholder('Select Message') //optional
            .addOption(option)*/
        
        //looking for menu message
        let menuMessage;

        message.channel.messages.fetch({limit: 2})
            .then(messages => {
                messages.forEach(message => {
                    if (message.content === '✤'){
                        menuMessage = message;
                        menuMessage.edit('✤') //add select here to edit button
                    }
                })
            })
            .catch(error => console.log(error))

        //message.edit('✤', delButton)
    },
}
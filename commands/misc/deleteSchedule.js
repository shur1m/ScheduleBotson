//creates menu that allows deleting scheduled messages
const data = require('../../data');

module.exports = {
    commands: ['deleteSchedule', 'delsched', 'delete'],
    expectedArgs: '<message content>',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        if (data.scheduledMessages.length === 0){
            message.reply("There are no scheduled messages to delete.");
            return;
        }

        deleteMessage(message, arguments);
    },
    permissions: [],
    requiredRoles: [],
}

//creates menu
function deleteMessage(message, arguments){
    let messageFound = false;
    let schedContent;

    //deleting scheduled message
    for (let i = 0; i < data.scheduledMessages.length; i++){
        item = data.scheduledMessages[i];

        if (item.content.startsWith(arguments[0])){
            clearTimeout(item.schedId);
            messageFound = true;
            schedContent = data.scheduledMessages[i].content
            data.scheduledMessages.splice(i, 1);
            data.scheduledCounter -= 1;
            console.log('scheduled message deleted');
        } 
    }

    //responding depending on whether message was deleted
    if (messageFound !== true) {
        message.reply(`That message either does not exist, or has already been deleted.`)
            .then(message => message.delete({ timeout: 2000 }))
    } else {
        message.reply(`The message: \n\n> ${schedContent} \n\n has been deleted.`)
            .then(message => message.delete({ timeout: 2000 }))
    }
}
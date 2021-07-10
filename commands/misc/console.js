const data = require("../../data");
const { v4: uuidv4 } = require('uuid');

//sends message to console 

module.exports = {
    commands: ['console', 'cs'],
    expectedArgs: '<message>',
    minArgs: 1,
    maxArgs: null,
    callback: (message, arguments, text, client) => {
        message.channel.send(`${text}`);
        let uuid = uuidv4();
        console.log(typeof uuid);
        console.log(uuid);

        //clearTimeout(data.scheduledMessages[0].schedId);
        //data.scheduledMessages.splice(0, 1);
        //console.log(data.scheduledMessages);

    },
    permissions: [],
    requiredRoles: [],
}
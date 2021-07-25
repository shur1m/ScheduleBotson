const data = require('../../data.js');

module.exports = {
    buttonID: 'UTC',
    type: 'menu',
    permissionError: 'You do not have permission to run this command.',
    permissions: [],
    requiredRoles: ['scheduler'],
    callback: (menu, client) => {
        
        if (data.channels[menu.channel.id] === undefined)
            data.channels[menu.channel.id] = {};

        data.channels[menu.channel.id].timeZone = menu.values[0];
        console.log(data);
    },
}
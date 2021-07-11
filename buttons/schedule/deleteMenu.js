const data = require('../../data.js');

module.exports = {
    buttonID: 'sched',
    type: 'menu',
    permissionError: 'You do not have permission to run this command.',
    permissions: [],
    requiredRoles: [],
    callback: (menu, client) => {
        if (data.channels[menu.channel.id] === undefined) {
            data.channels[menu.channel.id] = {}
        }

        data.channels[menu.channel.id].delIndex = menu.values[0];
        console.log(data);
    },
}
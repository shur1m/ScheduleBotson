data = require('../../data.js');

module.exports = {
    buttonID: 'UTC',
    type: 'menu',
    permissionError: 'You do not have permission to run this command.',
    permissions: [],
    requiredRoles: ['scheduler'],
    callback: (menu, client) => {
        data.scheduledTimeZone = menu.values[0];
        console.log(data);
    },
}
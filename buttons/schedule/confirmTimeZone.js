const collectSchedule = require('../../internal/collectSchedule');

module.exports = {
    buttonID: 'confirmTimeZone',
    type: 'button',
    permissionError: 'You do not have permission to run this command.',
    permissions: [],
    requiredRoles: ['scheduler'],
    callback: (button, client) => {
        collectSchedule(button, client);
    },
}
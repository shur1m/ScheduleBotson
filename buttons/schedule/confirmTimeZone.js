const collectSchedule = require('../../internal/collectSchedule');

module.exports = {
    buttonID: 'confirmTimeZone',
    permissionError: 'You do not have permission to run this command.',
    permissions: [],
    requiredRoles: [],
    callback: (button, client) => {
        collectSchedule(button, client);
    },
}
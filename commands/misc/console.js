//sends message to console 

module.exports = {
    commands: ['console', 'cs'],
    expectedArgs: '<message>',
    minArgs: 1,
    maxArgs: null,
    callback: (message, arguments, text, client) => {
        message.channel.send(`${text}`);
    },
    permissions: [],
    requiredRoles: [],
}
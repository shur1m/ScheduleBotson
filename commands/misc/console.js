//sends message to console 

module.exports = {
    commands: ['console', 'cs'],
    expectedArgs: '<message>',
    minArgs: 1,
    maxArgs: null,
    callback: (message, arguments, text, client) => {
        message.channel.send(`${text}`);
        console.log(text.substring(2, text.length-1));
        let myChannel = client.channels.cache.get('838968584678932480');
        myChannel.send('found it!');
    },
    permissions: [],
    requiredRoles: [],
}
module.exports = {

    buttonID: 'testButton',
    permissionError: 'You do not have permission to run this command.',
    permissions: ['ADMINISTRATOR'],
    requiredRoles: ['sddsada'],
    callback: (button, client) => {
        button.channel.send("helloworld");
    },
}
module.exports = {
    commands: ['add', 'addition'],
    expectedArgs: '<num1> <num2>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        let [num1, num2] = arguments;
        let sum = +num1 + (+num2);
        message.reply(`The sum is ${sum}`);
    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles: [],
}
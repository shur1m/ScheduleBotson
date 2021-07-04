let myCallback = function(message, arguments, text) {
    let [delay, ...input] = arguments;
        joinText = input.join(' ');

    setTimeout(() => {
        message.reply(`${joinText}`);            
    }, delay * 1000);
}

module.exports = {
    commands: ['schedule', 'sched'],
    expectedArgs: '<MM-DD-YYYY> <message>',
    minArgs: 2,
    maxArgs: null,
    callback: myCallback,
    permissions: [],
    requiredRoles: [],
}
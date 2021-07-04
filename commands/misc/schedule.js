let config = require('../../config.json');

let myCallback = function(message, arguments, text) {
    let [monthdayyear, hrsmin, ...input] = arguments;
        joinText = input.join(' ');

    //parsing entered args for date
    let [month, day, year] = monthdayyear.split("-").map(Number);
    let [hour, minute] = hrsmin.split(":").map(Number);
    month -= 1;
    
    //converting to actual dates
    let now = Date.now();
    let scheduledTime = new Date(year, month, day, hour, minute);

    //check if date is valid
    if ( isNaN(scheduledTime.getTime()) ){
        message.reply(`Invalid time! \nExample command: \`${config.prefix}schedule 1-1-1975 0:00 scheduledMessage\``);
        return;
    }

    let delay = scheduledTime.getTime() - now;

    if (delay < 500){
        message.reply("Invalid time: You cannot schedule a message in the past");
        return;
    }

    message.reply(`Your message, *${joinText}*, has been scheduled for ${scheduledTime}`);

    //scheduling message
    setTimeout(() => {
        message.channel.send(`${joinText}`);            
    }, delay);
}

module.exports = {
    commands: ['schedule', 'sched'],
    expectedArgs: '<MM-DD-YYYY> <HOUR:MINUTE> <message>',
    minArgs: 3,
    maxArgs: null,
    callback: myCallback,
    permissions: [],
    requiredRoles: [],
}
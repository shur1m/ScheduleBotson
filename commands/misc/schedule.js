let config = require('../../config.json');
const data = require('../../data.js');
const disbut = require('discord-buttons');

//creates menu and sends it
function createMenu(message, client){
    
    let options = [];
    let index = 0;

    //creating menu buttons for each time zone
    for (let i = -12; i < 12; i++){
        let UTCnum = (i >= 0) ? `UTC+${i}:00` : `UTC${i}:00`;
        if (i == 0) { UTCnum = 'UTC±00:00'; }

        options[index] = new disbut.MessageMenuOption()
        options[index].setLabel(UTCnum)
            .setValue(`UTC${i}`)
            .setEmoji('🌎')
            .setDefault()
        index++;
    }

    let select = new disbut.MessageMenu()
        .setID('timeZones')
        .setPlaceholder('Time Zones'); //optional

    //adding each option into selectmenu
    for (element of options){
        select.addOption(element);
    }

    //creating continue button
    let button = new disbut.MessageButton()
        .setStyle('blurple') //default: blurple
        .setLabel('Continue') //default: NO_LABEL_PROVIDED
        .setID('confirmTimeZone')
    
    message.channel.send('⠀', select);
    message.channel.send('Please select your time zone, then press continue', button)
    
}

let myCallback = function(message, arguments, text, client) {

    let [monthdayyear, hrsmin, ...input] = arguments;
        joinText = input.join(' ');

    createMenu(message, client);
}

module.exports = {
    commands: ['schedule', 'sched'],
    expectedArgs: '',
    minArgs: 0,
    maxArgs: 0,
    callback: myCallback,
    permissions: [],
    requiredRoles: [],
}
let config = require('../../config.json');
const data = require('../../data.js');
const disbut = require('discord-buttons');

let timeZoneDescriptions = [
    'Baker and Howland Islands', //UTC-12
    'American Samoa, Swains Island', //UTC-11
    'Honolulu', //UTC-10
    'Alaska Time Zone', //UTC-9
    'Los Angeles (non-daylight savings) , Vancouver', //UTC-8
    'Denver, Edmonton, Los Angeles (daylight savings)', //UTC-7
    'Mexico City, Chicago, Guatemala City', //UTC-6
    'New York, Toronto, Havana, Kingstom', //UTC-5
    'Santiago, Santo Domingo, Manaus', //UTC-4
    'São Paulo, Buenos Aires, Montevideo', //UTC-3
    'Fernando de Noronha', //UTC-2
    'Cape Verde', //UTC-1
    'London, Dublin, Lisbon, Abidjan, Accra', //UTC-0
    'Berlin, Rome, Paris, Madrid, Warsaw, Lagos', //UTC+1
    'Cairo, Johannesburg, Khartoum, Kyiv, Bucharest', //UTC+2
    'Moscow, Istanbul, Riyadh, Baghdad, Addis Ababa', //UTC+3
    'Dubai, Baku, Tbilisi, Yerevan, Samara', //UTC+4
    'Karachi, Tashkent, Yekaterinburg', //UTC+5
    'Dhaka, Almaty, Omsk', //UTC+6
    'Jakarta, Ho Chi Minh City, Bangkok, Krasnoyarsk', //UTC+7
    'Shanghai, Taipei, Kuala Lumpur, Singapore, Perth', //UTC+8
    'Tokyo, Seoul, Pyongyang, Ambon, Chita', //UTC+9
    'Sydney, Port Moresby, Vladivostok', //UTC+10
    'Nouméa', //UTC+11
    'Auckland, Suva, Petropavlovsk-Kamchatsky', //UTC+12
];

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
            .setDescription(timeZoneDescriptions[index])
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
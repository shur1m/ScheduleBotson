//awaiting messages: https://replit.com/talk/learn/Wait-for-messages-NodeJS-Discord-Bot-Development/23812
//this file uses button.clicker.id instead to await user who clicks button
//uuid https://github.com/uuidjs/uuid

const { v4: uuidv4 } = require('uuid');
const data = require('../data.js');
const sendAtDate = require('./sendAtDate.js');

module.exports = (button, client) => {
    let filter = m => m.author.id ===  button.clicker.id;
    receiveChannel(client, button, filter);

}

//prompts message channel from user
function receiveChannel(client, button, filter){
    button.channel.send('Please tag the channel you would like to schedule the message in.');
    
    //await message from clicker
    button.channel.awaitMessages(filter, {
        max: 1,
        time: 30 * 1000
    }).then(async (collected) => {
        console.log('collected:', collected.first().content);

        //finding channel id from collected message
        let text = collected.first().content
        let sendChannel = client.channels.cache.get(text.substring(2, text.length-1));

        //check is channel id is valid
        if (sendChannel === undefined) { throw { name: "TypeError", message: "Invalid channel tag" } }

        receiveDate(button, filter, sendChannel);
        return;

    }).catch((err) => {
        if (err.name === 'TypeError'){
            button.channel.send('ERROR: Invalid channel or no channel entered');
        }
        console.log(err);
        return;
    })
}

//prompts date and message from user
function receiveDate(button, filter, sendChannel){
    button.channel.send('Please enter a date, time, and message in the format `<MM-DD-YYYY> <HOUR:MIN> <scheduledMessage>`');

    //await message from clicker
    button.channel.awaitMessages(filter, {
        max: 1,
        time: 5 * 60 * 1000
    }).then(async (collected) => {
        console.log('collected:', collected.first().content);
        scheduleInput(collected.first(), sendChannel);
        return;
    }).catch((err) => {
        if (err.name === 'SyntaxError'){
            button.channel.send('Error: You entered an invalid date');
        } else if (err.name === 'TypeError'){
            button.channel.send('You took too long to respond. Press the button again to schedule a message.');
        }
        console.log(err);
        return;
    })
}

function scheduleInput(message, sendChannel){

    //split message content into array
    let inputText = message.content;
    const arguments = inputText.split(/[ ]+/);

    if (arguments.length < 3){
        message.reply("Incorrect Syntax! Please press continue to schedule a message again \n Example: `12-31-2076 12:36 scheduledMessage`");
        return;
    }

    let [monthdayyear, hrsmin, ...textArray] = arguments;
    let joinText = textArray.join(' ');

    //parsing entered args for date
    let [month, day, year] = monthdayyear.split("-").map(Number);
    let [hour, minute] = hrsmin.split(":").map(Number);

    if (!(month + day + year + hour + minute)){
        throw { name: "SyntaxError", message: "Incorrect syntax" }
    }

    //adding zeroes in front of single digit values
    month = addZero(month);
    day = addZero(day);
    hour = addZero(hour);
    minute = addZero(minute);
    
    //converting to actual dates
    let dataTimeZone = data.channels[message.channel.id]?.timeZone ?? 'UTC0';
    console.log(dataTimeZone);
    let timeZoneStr = addZero( +dataTimeZone.slice(3) );
    timeZoneStr = (+timeZoneStr >= 0) ? '+' + timeZoneStr : timeZoneStr;

    let now = Date.now();
    let scheduledTime = new Date( Date.parse(`${year}-${month}-${day}T${hour}:${minute}:00.000${timeZoneStr}:00`) );
    
    //check if date is valid
    if ( isNaN(scheduledTime.getTime()) ){
        message.reply(`Invalid time! \nExample command: \`${config.prefix}schedule 1-1-1975 0:00 scheduledMessage\``);
        return;
    }

    if (scheduledTime.getTime() - now < 500){
        message.reply("Invalid time: You cannot schedule a message in the past");
        return;
    }

    let delay = scheduledTime.getTime() - now;

    message.reply(`Your message: \n\n \`\`\`${joinText} \`\`\` \n\n has been scheduled for ${month}-${day}-${year} at ${hour}:${minute} UTC${timeZoneStr}:00`);

    //creating unique id
    uniqueId = uuidv4();

    //scheduling message

    let dateArray = [month, day, year, hour, minute, timeZoneStr];
    sendAtDate(scheduledTime, joinText, sendChannel, uniqueId, dateArray);
    
    data.scheduledCounter += 1;
    console.log(data);
}

//ensures syntax for date parsing is correct
function addZero(num){
    let str = num.toString();
    if ( (num < 10) && (num > -10) ){
        str = (num >= 0) ? ('0' + str) : ('-0' + (num * -1));
    }

    return str;
}
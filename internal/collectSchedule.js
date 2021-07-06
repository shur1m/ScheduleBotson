//awaiting messages: https://replit.com/talk/learn/Wait-for-messages-NodeJS-Discord-Bot-Development/23812
//this file uses button.clicker.id instead to await user who clicks button

const data = require('../data');

module.exports = (button) => {
    receiveDate(button);

}

function receiveDate(button){
    button.channel.send('Please enter a date, time, and message in the format `<MM-DD-YYYY> <HOUR:MIN> <scheduledMessage>`');

    //ensures message author is equal to clicker of button
    const filter = m => m.author.id ===  button.clicker.id;

    //await message from clicker
    button.channel.awaitMessages(filter, {
        max: 1,
        time: 5 * 60 * 1000
    }).then(async (collected) => {
        console.log('collected:', collected.first().content);
        scheduleInput(collected.first());
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

function scheduleInput(message){

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
    let timeZoneStr = addZero( +data.scheduledTimeZone.slice(3) );
    timeZoneStr = (+timeZoneStr >= 0) ? '+' + timeZoneStr : timeZoneStr;

    let now = Date.now();
    let scheduledTime = new Date( Date.parse(`${year}-${month}-${day}T${hour}:${minute}:00.000${timeZoneStr}:00`) );
    
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

    message.reply(`Your message, *${joinText}*, has been scheduled for ${month}-${day}-${year} at ${hour}:${minute} UTC${timeZoneStr}:00`);

    //scheduling message
    let timerId = setTimeout(() => {

        message.channel.send(`${joinText}`);
        data.scheduledCounter -= 1;
        data.scheduledMessages.splice(0, 1);
        console.log(data);
    }, delay);

    //saving timerid +other info in data file
    data.scheduledMessages[data.scheduledCounter] = {
        schedId: timerId,
        content: joinText,
        dateAndTime: `${month}-${day}-${year}, ${hour}:${minute} UTC${timeZoneStr}:00`,
    };
    data.scheduledCounter += 1;
    console.log(data);
}

function addZero(num){
    let str = num.toString();
    if ( (num < 10) && (num > -10) ){
        str = (num >= 0) ? ('0' + str) : ('-0' + (num * -1));
    }

    return str;
}
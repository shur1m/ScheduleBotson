//awaiting messages: https://replit.com/talk/learn/Wait-for-messages-NodeJS-Discord-Bot-Development/23812
//this file uses button.clicker.id instead to await user who clicks button

const data = require('../data');

module.exports = (button) => {
    console.log(button.clicker.id);
    button.channel.send('Please enter a date and time in the format `<MM-DD-YYYY> <HOUR:MIN>`');

    //ensures message author is equal to clicker of button
    const filter = m => m.author.id ===  button.clicker.id;

    //await message from clicker
    button.channel.awaitMessages(filter, {
        max: 1,
        time: 10000
    }).then(async (collected) => {
        console.log('collected:', collected.first().content);
        scheduleInput(collected.first());
        return;
    }).catch((err) => {
        button.channel.send('You took to long to respond. Press the button again to schedule a message.');
        console.error(err);
        return;
    })

}

function scheduleInput(message){

    //split message content into array
    let inputText = message.content;
    const arguments = inputText.split(/[ ]+/);

    if (arguments.length !== 3){
        message.reply("Incorrect Syntax! Please press continue to schedule a message again \n Example: `12-31-2076 12:36 scheduledMessage`");
        return;
    }

    let monthdayyear = arguments[0];
    let hrsmin = arguments[1];
    let joinText = arguments[2];

    //parsing entered args for date
    let [month, day, year] = monthdayyear.split("-").map(Number);
    let [hour, minute] = hrsmin.split(":").map(Number);
    month -= 1;
    
    //converting to actual dates
    let now = Date.now();
    let scheduledTime = new Date();
    scheduledTime.setUTCFullYear(year, month, day);
    scheduledTime.setUTCHours(hour, minute, 0);

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
    let timerId = setTimeout(() => {

        message.channel.send(`${joinText}`);
        data.scheduledCounter -= 1;
        data.scheduledMessages.splice(0, 1);

        console.log(data);
    }, delay);

    //saving timerid in data file
    data.scheduledMessages[data.scheduledCounter] = timerId;
    data.scheduledCounter += 1;
    console.log(data);
}
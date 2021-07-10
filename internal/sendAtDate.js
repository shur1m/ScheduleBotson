//gets allows for more than 24 days of settimeout
const data = require('../data.js');

module.exports = function sendAtDate(date, text, sendChannel, uniqueID, dateArray){
    let [month, day, year, hour, minute, timeZoneStr] = dateArray

    //add scheduled message to data
    data.scheduledMessages.push({
        uuid: uniqueID,
        content: text,
        dateAndTime: `${month}-${day}-${year}, ${hour}:${minute} UTC${timeZoneStr}:00`,
    });

    //runs sends message at date
    runAtDate(date, () => {
        sendSchedMessage(text, sendChannel, uniqueID);
    }, uniqueID);
}

//recursively calls settimeout
function runAtDate(date, func, uniqueID) {
    var now = (new Date()).getTime();
    var then = date.getTime();
    var diff = Math.max((then - now), 0);

    let message;

    //find right scheduled message
    for (let i = 0; i < data.scheduledMessages.length; i++){
        if (data.scheduledMessages[i].uuid == uniqueID){
            message = data.scheduledMessages[i];
            break;
        }
    }

    //set timeout to max value or correct time
    if (diff > 0x7FFFFFFF){
        message.schedId = setTimeout(function() {runAtDate(date, func, uniqueID);}, 0x7FFFFFFF);
    }
    else {
        message.schedId = setTimeout(func, diff);
    }
}

//send the message
function sendSchedMessage(text, sendChannel, uniqueID){
    sendChannel.send(`${text}`);
    data.scheduledCounter -= 1;

    //find correct message and remove from data
    for (let i = 0; i < data.scheduledMessages.length; i++){
        if (data.scheduledMessages[i].uuid == uniqueID){
            data.scheduledMessages.splice(i, 1);
            break;
        }
    }

    console.log(data);
}
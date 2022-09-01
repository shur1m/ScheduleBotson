# Schedule Botson: Your Personal Discord Secretary

## About

Botson remembers to send messages so you don't have to :).

## Features 

### Implemented:
* Scheduling messages via Menu
  * Allows you to schedule a message sent by the bot by date and time
  * use `!schedule` to schedule a message, and `!showschedule` to show scheduled messages in an embed
  * use `!delete` to delete a scheduled message. This deletes any message that starts with the argument.
  * use `!show` to show scheduled messages in an embed

![Uzoma Medium Gif](https://i.imgur.com/hhPeiX5.gif)

## Inviting the bot: 

Unfortunately I am no longer hosting this bot on a server. Feel free to host the bot on your own computer. I order to do this, you will need to create a file named `config.json` under the main directory ScheduleBotson. The following text should be placed in `config.json`.
```json
{
    "token": "your token",
    "prefix": "!"
}
```
Replace `"your token"` with your own bot token in quotes and change the prefix to whatever you would like the bot to respond to.

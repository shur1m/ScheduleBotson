# Schedule Botson: Your Personal Discord Secretary

## About

Botson is the best secretary (discord bot) you've never had! It schedules messages/ announcements for you, and has memorized 7 different Japanese dictionaries!

## Roadmap

### Implemented:
* Scheduling messages via Menu
  * Allows you to schedule a message sent by the bot by date and time
  * currently only supports up to 24 days into the future (issue WIP)
  * use `!schedule` to schedule a message, and `!showschedule` to show scheduled messages in an embed
  * will implement deleting scheduled messages later

![Uzoma Medium Gif](https://i.imgur.com/hhPeiX5.gif)

### Planned:
* Deleting scheduled messages
* access to google calendar through discord
* access to jmdict, weblio, and kotobank dictionaries<br>
* Quizz/ poll functionality
* creating menus using new button functionality

### Unsure:
* slash commands - currently difficult to implement. might wait for discord.js

## Hosting the bot

Requires NodeJS v12 or after <br>
Using the terminal, navigate to bot folder and run `node index.js`

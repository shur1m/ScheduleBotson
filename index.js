const path = require('path');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const disbut = require('discord-buttons');
disbut(client);

const data = require('./data.js');
const { token } = require('./config.json');
const menuSettings = require('./menuSettings.js');

console.log(data);

//initializing bot
client.on('ready', async () => {
    console.log('the client is ready');
    
    const baseFile = 'command-base.js';
    const commandBase = require(`./commands/${baseFile}`);

    const basefile1 = 'button-base.js';
    const buttonBase = require(`./buttons/${basefile1}`);

    //reading files from commands folder
    const readCommands = (dir, register, dontRegister) => {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of files){
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file), register);
            } else if (file !== dontRegister){
                const option = require(path.join(__dirname, dir, file))
                register(client, option);
            }
        }
    };

    readCommands('commands', commandBase, baseFile);
    readCommands('buttons', buttonBase, basefile1);
    menuSettings(client);
});

client.login(token);
const collectSchedule = require('./internal/collectSchedule.js');

module.exports = (client) => {
    const data = require('./data.js');

    //menu settings for schedule
    client.on('clickMenu', async (menu) => {
        if (menu.values[0].startsWith('UTC')) {
            data.scheduledTimeZone = menu.values[0];
        }
        
        console.log(data);
        await menu.reply.defer();
        return;
    });

    //button setting for schedule
    client.on('clickButton', async (button) => {
        switch (button.id) {
            case 'confirmTimeZone':
                collectSchedule(button, client);
                //fixes interaction failed
                await button.reply.defer();
                break;
        
            default:
                break;
        }
    });
};
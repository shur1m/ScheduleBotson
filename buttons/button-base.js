const ensureBotPermissions = require("../internal/ensureBotPermissions");

const validatePermissions = (permissions) => {
    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ]
  
    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`Unknown permission node "${permission}"`)
        }
    }
}

module.exports = (client, buttonOptions) => {
    let {
        buttonID,
        permissionError = 'You do not have permission to use this button.',
        permissions = [],
        botPermissions = ['SEND_MESSAGES'],
        requiredRoles = [],
        type,
        callback,
    } = buttonOptions

    console.log(`Registering button/menu "${buttonID}"`)

    if (permissions.length) {
        if (typeof permissions === 'string') {
          permissions = [permissions]
        }
    
        validatePermissions(permissions)
    }

    //check if type is button
    if (type === 'button'){

        client.on('clickButton', async (button)=> {
            const member = button.clicker.member;
            const guild = button.guild;

            //check button id
            if (button.id === buttonID){
                //button has been run

                //ensure bot can send messages in channel
                if (ensureBotPermissions(client, member, button, botPermissions)){
                    await button.reply.defer()
                    return;
                }
                
                if (checkPermissions(permissions, member, button, permissionError)) {
                    await button.reply.defer()
                    return
                }
        
                //check user roles
                if (checkRoles(requiredRoles, guild, member, button)){
                    await button.reply.defer()
                    return
                }
                
                //call function
                try {
                    callback(button, client)
                } catch(error) {
                    console.error(error)
                }
                
                await button.reply.defer();
            }
            
        })
    }

    if (type == 'menu'){
        
        client.on('clickMenu', async (menu) => {
            const member = menu.clicker.member;
            const guild = menu.guild;

            if (checkPermissions(permissions, member, menu, permissionError)) {
                await menu.reply.defer();
                return;
            }

            if (checkRoles(requiredRoles, guild, member, menu)){
                await menu.reply.defer();
                return;
            }

            if (menu.values[0].startsWith(buttonID)) {

                //ensure bot has permission to send messages
                if (ensureBotPermissions(client, member, menu, botPermissions)){
                    await menu.reply.defer()
                    return;
                }

                callback(menu, client);
                await menu.reply.defer();
            }
        });
    }
}

function checkPermissions(permissions, member, attachment, permissionError){
    for (const permission of permissions) {
        if (!member.hasPermission(permission)) {
          attachment.channel.send(`<@${member.id}>, ${permissionError}`)
          return true;
        }
    }
}

function checkRoles(requiredRoles, guild, member, attachment){
    for (const requiredRole of requiredRoles) {
        const role = guild.roles.cache.find(
          (role) => role.name === requiredRole
        )

        if (!role || !member.roles.cache.has(role.id)) {
          attachment.channel.send(`<@${member.id}>, You must have the "${requiredRole}" role to use this button.`)
          return true
        }
    }
}
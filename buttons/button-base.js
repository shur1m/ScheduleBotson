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
        requiredRoles = [],
        callback,
    } = buttonOptions

    console.log(`Registering button "${buttonID}"`)

    if (permissions.length) {
        if (typeof permissions === 'string') {
          permissions = [permissions]
        }
    
        validatePermissions(permissions)
    }

    client.on('clickButton', async (button)=> {
        const member = button.clicker.member;
        const guild = button.guild;
        

        //check button id
        if (button.id === buttonID){
            //button has been run

            //check user permissions
            for (const permission of permissions) {
                if (!member.hasPermission(permission)) {
                  button.channel.send(`<@${member.id}>, ${permissionError}`)
                  await button.reply.defer()
                  return
                }
            }

            //check user roles
            for (const requiredRole of requiredRoles) {
                const role = guild.roles.cache.find(
                  (role) => role.name === requiredRole
                )
      
                if (!role || !member.roles.cache.has(role.id)) {
                  button.channel.send(`<@${member.id}>, You must have the "${requiredRole}" role to use this button.`)
                  await button.reply.defer()
                  return
                }
            }

            callback(button, client)
            await button.reply.defer();
        }
        
    })
}

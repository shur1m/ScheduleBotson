const { prefix } = require('../config.json')
const ensureBotPermissions = require('../internal/ensureBotPermissions')

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

module.exports = (client, commandOptions) => {
  let {
    commands,
    expectedArgs = '',
    permissionError = 'You do not have permission to run this command.',
    minArgs = 0,
    maxArgs = null,
    permissions = [],
    botPermissions = ['SEND_MESSAGES'],
    requiredRoles = [],
    callback,
    internal = false,
  } = commandOptions

  // Ensure the command and aliases are in an array
  if (typeof commands === 'string') {
    commands = [commands]
  }

  console.log(`Registering command "${commands[0]}"`)

  // Ensure the permissions are in an array and are all valid
  if (permissions.length) {
    if (typeof permissions === 'string') {
      permissions = [permissions]
    }

    validatePermissions(permissions)
  }

  // Listen for messages
  client.on('message', (message) => {

    const { member, content, guild } = message

    for (const alias of commands) {
      const command = `${prefix}${alias.toLowerCase()}`

      if (
        content.toLowerCase().startsWith(`${command} `) ||
        content.toLowerCase() === command
      ) {
        // A command has been ran

        //ensure textchannel is not a dm
        if (message.channel.type === 'dm'){
          message.channel.send('Unfortunately, this bot does not work within Direct Messages. Please use commands in a guild channel.');
          return;
        }

        //ensure bot can send messages in channel
        if (ensureBotPermissions(client, member, message, botPermissions)){
          return;
        }

        // Ensure the user has the required permissions
        for (const permission of permissions) {
          if (!member.hasPermission(permission)) {
            message.reply(permissionError)
            return
          }
        }

        // Ensure the user has the required roles
        for (const requiredRole of requiredRoles) {
          const role = guild.roles.cache.find(
            (role) => role.name === requiredRole
          )

          if (!role || !member.roles.cache.has(role.id)) {
            message.reply(
              `You must have the "${requiredRole}" role to use this command.`
            )
            return
          }
        }

        // Split on any number of spaces
        const arguments = content.split(/[ ]+/)

        // Remove the command which is the first index
        if (!internal){
          arguments.shift()
        }
        

        // Ensure we have the correct number of arguments
        if (
          arguments.length < minArgs ||
          (maxArgs !== null && arguments.length > maxArgs)
        ) {
          message.reply(
            `Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`
          )
          return
        }

        // Handle the custom command code
        try {
          callback(message, arguments, arguments.join(' '), client)
        }
        catch(error){
          console.error(error);
        }

        return
      }
    }
  })
}
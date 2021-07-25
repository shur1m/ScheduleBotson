module.exports = (client, member, obj, permissions) => {
    let botPerms = obj.channel.permissionsFor(client.user).toArray();
    let hasPermission = true; //'SEND_MESSAGES'
    let missingPerms = [];
    
    for (permission of permissions){
        if (!botPerms.includes(permission)){
            missingPerms.push(permission);
        }
    }

    if (missingPerms.length != 0){
        const missingPermsStr = missingPerms.join(', ');
        member.send(`**ERROR**: The bot does not have the permissions to perform this action in that channel. \nMissing permissions: \`${missingPermsStr}\``);
    }

    return missingPerms.length != 0;
}
import { Client, RawGuildRoleUpdateData, Role, RoleData } from "../../../../internal";

export default function guildRoleUpdate(client: Client, rawData: RawGuildRoleUpdateData) {

    // Parse role data
    const roleData: RoleData = Role._fromRawData(client, rawData.role, rawData.guild_id);

    // Emit event
    client.emit("guildRoleUpdate", roleData, {
        rawData,
        role: client.roles.get(roleData.id),
        guild: client.guilds.get(roleData.guildID)
    });
}
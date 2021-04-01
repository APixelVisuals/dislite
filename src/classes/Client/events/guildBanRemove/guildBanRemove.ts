import { Ban, Client, GuildBanRemoveData, RawGuildBanRemoveData, User } from "../../../../internal";

export default function guildBanRemove(client: Client, rawData: RawGuildBanRemoveData) {

    // Parse data
    const data: GuildBanRemoveData = {
        guildID: rawData.guild_id,
        user: User._fromRawData(client, rawData.user)
    };

    // Get ban
    const ban: Ban | undefined = client.bans.get(data.guildID, data.user.id);

    // Remove from cache
    if (ban) ban.uncache();

    // Emit event
    client.emit("guildBanRemove", data, {
        rawData,
        ban,
        member: client.members.get(data.guildID, data.user.id),
        guild: client.guilds.get(data.guildID),
        user: client.users.get(data.user.id)
    });
}
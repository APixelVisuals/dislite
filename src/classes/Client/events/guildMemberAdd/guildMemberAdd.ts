import { Client, Member, MemberData, RawGuildMemberAddData } from "../../../../internal";

export default function guildMemberAdd(client: Client, rawData: RawGuildMemberAddData) {

    // Parse member data
    const memberData: MemberData = Member._fromRawData(client, rawData, rawData.guild_id);

    // Emit event
    client.emit("guildMemberAdd", memberData, {
        rawData,
        member: client.members.get(memberData.guildID, memberData.user.id),
        guild: client.guilds.get(memberData.guildID),
        user: client.users.get(memberData.user.id)
    });
}
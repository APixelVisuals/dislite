import { AnyChannel, Ban, Client, Command, Emoji, Guild, GuildDeleteData, GuildWidget, Invite, Member, Message, RawGuildDeleteData, Role, Template, VanityInvite, Webhook, WelcomeScreen } from "../../../../internal";
import ready from "../ready";

export default function guildDelete(client: Client, rawData: RawGuildDeleteData) {

    // Parse data
    const data: GuildDeleteData = {
        id: rawData.id
    };

    // Initial guild delete event
    if (client._uninitializedGuilds.has(data.id)) {

        // Remove from uninitialized guilds
        client._uninitializedGuilds.delete(data.id);

        // Add to ready data
        client._readyData?.data.unavailableGuilds.push(data);

        // Ready
        if (client._uninitializedGuilds.size === 0) ready(client);
    }

    // Guild unavailable
    else if (rawData.unavailable) {

        // Add to unavailable guilds
        client._unavailableGuilds.add(data.id);

        // Emit event
        client.emit("guildUnavailable", data, {
            rawData,
            guild: client.guilds.get(data.id)
        });
    }

    // Removed from guild
    else {

        // Get guild
        const guild: Guild | undefined = client.guilds.get(data.id);

        // Mark as deleted
        if (guild) guild._markAsDeleted();

        // Mark bans as deleted
        const bans: Ban[] = [...client.bans.filter((b: Ban) => b.guildID === data.id).values()];
        bans.forEach((b: Ban) => b._markAsDeleted());

        // Mark channels as deleted
        const channels: AnyChannel[] = [...client.channels.filter((c: AnyChannel) => {
            if ("guildID" in c) return c.guildID === data.id;
            else return false;
        }).values()];
        channels.forEach((c: AnyChannel) => c._markAsDeleted());

        // Mark commands as deleted
        const commands: Command[] = [...client.commands.filter((c: Command) => c.guildID === data.id).values()];
        commands.forEach((c: Command) => c._markAsDeleted());

        // Mark emojis as deleted
        const emojis: Emoji[] = [...client.emojis.filter((e: Emoji) => e.guildID === data.id).values()];
        emojis.forEach((e: Emoji) => e._markAsDeleted());

        // Mark guild widget as deleted
        const guildWidget: GuildWidget | undefined = client.guildWidgets.get(data.id);
        if (guildWidget) guildWidget._markAsDeleted();

        // Mark invites as deleted
        const invites: Invite[] = [...client.invites.filter((i: Invite) => i.guildID === data.id).values()];
        invites.forEach((i: Invite) => i._markAsDeleted());

        // Mark members as deleted
        const members: Member[] = [...client.members.filter((m: Member) => m.guildID === data.id).values()];
        members.forEach((m: Member) => m._markAsDeleted());

        // Mark messages as deleted
        const messages: Message[] = [...client.messages.filter((m: Message) => m.guildID === data.id).values()];
        messages.forEach((m: Message) => m._markAsDeleted());

        // Mark roles as deleted
        const roles: Role[] = [...client.roles.filter((r: Role) => r.guildID === data.id).values()];
        roles.forEach((r: Role) => r._markAsDeleted());

        // Mark templates as deleted
        const templates: Template[] = [...client.templates.filter((t: Template) => t.sourceGuildID === data.id).values()];
        templates.forEach((t: Template) => t._markAsDeleted());

        // Mark vanity invite as deleted
        const vanityInvite: VanityInvite | undefined = client.vanityInvites.get(data.id);
        if (vanityInvite) vanityInvite._markAsDeleted();

        // Mark webhooks as deleted
        const webhooks: Webhook[] = [...client.webhooks.filter((w: Webhook) => w.guildID === data.id).values()];
        webhooks.forEach((w: Webhook) => w._markAsDeleted());

        // Mark welcome screen as deleted
        const welcomeScreen: WelcomeScreen | undefined = client.welcomeScreens.get(data.id);
        if (welcomeScreen) welcomeScreen._markAsDeleted();

        // Remove from guild owners
        if (client._guildOwners) client._guildOwners.delete(data.id);

        // Remove from role permissions
        if ((client._rolePermissions) && (client._guildRoles)) {
            const guildRoles: string[] | undefined = client._guildRoles.get(data.id);
            if (guildRoles) guildRoles.forEach((r: string) => client._rolePermissions?.delete(r));
        }

        // Remove from channel permissions
        if ((client._channelPermissions) && (client._guildChannels)) {
            const guildChannels: string[] | undefined = client._guildChannels.get(data.id);
            if (guildChannels) guildChannels.forEach((c: string) => client._channelPermissions?.delete(c));
        }

        // Remove from emoji guilds
        if ((client._emojiGuilds) && (client._guildEmojis)) {
            const guildEmojis: string[] | undefined = client._guildEmojis.get(data.id);
            if (guildEmojis) guildEmojis.forEach((e: string) => client._emojiGuilds?.delete(e));
        }

        // Remove from guild roles
        if (client._guildRoles) client._guildRoles.delete(data.id);

        // Remove from guild channels
        if (client._guildChannels) client._guildChannels.delete(data.id);

        // Remove from guild emojis
        if (client._guildEmojis) client._guildEmojis.delete(data.id);

        // Remove from client roles
        if (client._clientRoles) client._clientRoles.delete(data.id);

        // Emit event
        client.emit("guildDelete", data, {
            rawData,
            guild
        });
    }
}
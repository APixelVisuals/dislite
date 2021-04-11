import { Client, FetchQueue, Guild, GuildResolvable, Role, RoleResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteGuildRole(client: Client, guildResolvable: GuildResolvable, roleResolvable: RoleResolvable, reason?: string): Promise<void> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const roleID: string | undefined = Role.resolveID(roleResolvable);
    if (!roleID) throw new Error("Invalid role resolvable");

    // Missing permissions
    if (
        client._cacheStrategies.permissions.enabled &&
        (
            !client.hasPermission("MANAGE_ROLES", guildID) ||
            !client.canManageRoles(guildID, roleID)
        )
    ) throw new Error("Missing permissions to delete this role");

    // Define fetch data
    const path: string = `/guilds/${guildID}/roles/${roleID}`;
    const method: string = "DELETE";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method,
        auditLogReason: reason
    });
}
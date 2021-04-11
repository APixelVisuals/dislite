import { Channel, ChannelResolvable, Client, FetchQueue, Message, MessageResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteMessage(client: Client, channelResolvable: ChannelResolvable, messageResolvable: MessageResolvable, reason?: string): Promise<void> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const messageID: string | undefined = Message.resolveID(messageResolvable);
    if (!messageID) throw new Error("Invalid message resolvable");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("MANAGE_MESSAGES", channelID))) throw new Error("Missing manage messages permissions");

    // Define fetch data
    const path: string = `/channels/${channelID}/messages/${messageID}`;
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
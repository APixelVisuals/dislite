import { Channel, ChannelResolvable, Client, FetchQueue, Message, MessageResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface BulkDeleteMessagesData {
    messages: MessageResolvable[];
}

export default async function bulkDeleteMessages(client: Client, channelResolvable: ChannelResolvable, bulkDeleteMessagesData: BulkDeleteMessagesData): Promise<void> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const messages: Array<string | undefined> = bulkDeleteMessagesData.messages.map((m: MessageResolvable) => Message.resolveID(m));
    if (messages.find((m: string | undefined) => !m)) throw new Error("Invalid message resolvable in array of messages to bulk delete");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("MANAGE_MESSAGES", channelID))) throw new Error("Missing manage messages permissions");

    // Define fetch data
    const path: string = `/channels/${channelID}/messages/bulk-delete`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method,
        data: {
            messages
        }
    });
}
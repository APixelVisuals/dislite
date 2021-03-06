import { AnyChannel, Channel, ChannelResolvable, Client, FetchQueue, PermissionError, RawChannelData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteChannel(client: Client, channelResolvable: ChannelResolvable, reason?: string): Promise<AnyChannel> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("MANAGE_CHANNELS", channelID))) throw new PermissionError({ permission: "MANAGE_CHANNELS" });

    // Define fetch data
    const path: string = `/channels/${channelID}`;
    const method: string = "DELETE";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawChannelData = await fetchQueue.request({
        path,
        method,
        auditLogReason: reason
    });

    // Parse channel
    const channel: AnyChannel = Channel._fromRawData(client, result);

    // Return
    return channel;
}
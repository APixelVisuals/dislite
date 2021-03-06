import { AnyChannel, APIError, Channel, ChannelResolvable, Client, FetchQueue, RawChannelData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getChannel(client: Client, channelResolvable: ChannelResolvable): Promise<AnyChannel | undefined> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

    // Define fetch data
    const path: string = `/channels/${channelID}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    let unknownChannel: boolean = false;
    const result: RawChannelData = await fetchQueue.request({
        path,
        method
    }).catch((err: APIError) => {

        // Unknown channel
        if (err.code === 10003) unknownChannel = true;

        // Throw error
        else throw err;
    });

    // Unknown channel
    if (unknownChannel) return;

    // Parse channel
    const channel: AnyChannel = Channel._fromRawData(client, result);

    // Return
    return channel;
}
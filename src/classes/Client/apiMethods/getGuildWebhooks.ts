import { Client, FetchQueue, Guild, GuildResolvable, RawWebhookData, Webhook } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildWebhooks(client: Client, guildResolvable: GuildResolvable): Promise<Webhook[]> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}/webhooks`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawWebhookData[] = await fetchQueue.request({
        path,
        method
    });

    // Parse webhooks
    const webhooks: Webhook[] = result.map((w: RawWebhookData) => Webhook._fromRawData(client, w));

    // Return
    return webhooks;
}
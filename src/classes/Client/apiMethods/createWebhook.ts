import { Channel, ChannelResolvable, Client, FetchQueue, RawWebhookData, Webhook, WebhookData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateWebhookData {
    name: string;
    avatar?: string;
}

export default async function createWebhook(client: Client, channelResolvable: ChannelResolvable, createWebhookData: CreateWebhookData, reason?: string): Promise<WebhookData> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("MANAGE_WEBHOOKS", channelID))) throw new Error("Missing manage webhooks permissions");

    // Define fetch data
    const path: string = `/channels/${channelID}/webhooks`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawWebhookData = await fetchQueue.request({
        path,
        method,
        data: {
            name: createWebhookData.name,
            avatar: createWebhookData.avatar
        },
        auditLogReason: reason
    });

    // Parse webhook data
    const webhookData: WebhookData = Webhook._fromRawData(client, result);

    // Return
    return webhookData;
}
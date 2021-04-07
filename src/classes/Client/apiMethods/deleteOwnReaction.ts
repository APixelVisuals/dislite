import { Channel, ChannelResolvable, Client, FetchQueue, Message, MessageResolvable, Reaction, ReactionEmojiResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteOwnReaction(client: Client, channelResolvable: ChannelResolvable, messageResolvable: MessageResolvable, reactionEmojiResolvable: ReactionEmojiResolvable): Promise<void> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const messageID: string | undefined = Message.resolveID(messageResolvable);
    if (!messageID) throw new Error("Invalid message resolvable");
    const reactionEmoji: string | undefined = Reaction.resolveString(reactionEmojiResolvable);
    if (!reactionEmoji) throw new Error("Invalid reaction emoji resolvable");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("VIEW_CHANNEL", channelID))) throw new Error("Missing view channel permissions");

    // Define fetch data
    const path: string = `/channels/${channelID}/messages/${messageID}/reactions/${encodeURIComponent(reactionEmoji)}/@me`;
    const method: string = "DELETE";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method
    });
}
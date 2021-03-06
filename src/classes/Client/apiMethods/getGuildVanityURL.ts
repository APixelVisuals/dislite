import { APIError, Client, FetchQueue, Guild, GuildResolvable, RawVanityInviteData, VanityInvite } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildVanityURL(client: Client, guildResolvable: GuildResolvable): Promise<VanityInvite | undefined> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Define fetch data
    const path: string = `/guilds/${guildID}/vanity-url`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    let noVanityURL: boolean = false;
    const result: RawVanityInviteData = await fetchQueue.request({
        path,
        method
    }).catch((err: APIError) => {

        // No vanity url
        if (err.code === 50001) noVanityURL = true;

        // Throw error
        else throw err;
    });

    // No vanity url
    if (noVanityURL) return;

    // Parse vanity invite
    const vanityInvite: VanityInvite = VanityInvite._fromRawData(client, result, guildID);

    // Return
    return vanityInvite;
}
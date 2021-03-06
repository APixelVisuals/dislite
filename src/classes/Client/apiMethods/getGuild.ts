import queryString from "query-string";
import { APIError, Client, FetchQueue, Guild, GuildResolvable, RawGuildData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface GetGuildData {
    withCounts?: boolean;
}

export default async function getGuild(client: Client, guildResolvable: GuildResolvable, getGuildData: GetGuildData = {}): Promise<Guild | undefined> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Define fetch data
    const path: string = `/guilds/${guildID}?${queryString.stringify({
        with_counts: getGuildData.withCounts
    })}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    let unknownGuild: boolean = false;
    const result: RawGuildData = await fetchQueue.request({
        path,
        method
    }).catch((err: APIError) => {

        // Unknown guild
        if (err.code === 50001) unknownGuild = true;

        // Throw error
        else throw err;
    });

    // Unknown guild
    if (unknownGuild) return;

    // Parse guild
    const guild: Guild = Guild._fromRawData(client, result);

    // Return
    return guild;
}
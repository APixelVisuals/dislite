import { Ban, Client, FetchQueue, Guild, GuildResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseBan from "../events/parseBan";
import { RawBanData } from "../events/rawBanData";

export default async function getGuildBan(client: Client, guildResolvable: GuildResolvable, userResolvable: UserResolvable): Promise<Ban> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);
    const userID: string = User.resolveID(userResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}/bans/${userID}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawBanData = await fetchQueue.request({
        path,
        method
    });

    // Parse ban
    const ban: Ban = parseBan(client, result);

    // Return
    return ban;
}
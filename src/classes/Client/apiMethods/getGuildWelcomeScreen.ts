import { Client, FetchQueue, Guild, GuildResolvable, RawWelcomeScreenData, WelcomeScreen, WelcomeScreenData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildWelcomeScreen(client: Client, guildResolvable: GuildResolvable): Promise<WelcomeScreenData | undefined> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Define fetch data
    const path: string = `/guilds/${guildID}/welcome-screen`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawWelcomeScreenData | undefined = await fetchQueue.request({
        path,
        method
    });

    // Parse welcome screen data
    const welcomeScreenData: WelcomeScreenData | undefined = result && WelcomeScreen._fromRawData(client, result, guildID);

    // Return
    return welcomeScreenData;
}
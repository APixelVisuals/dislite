import { Client, Command, CommandData, CommandOption, FetchQueue, Guild, GuildResolvable, RawCommandData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateCommandData {
    name: string;
    description: string;
    options?: CommandOption;
}

export default async function createGuildCommand(client: Client, guildResolvable: GuildResolvable, createCommandData: CreateCommandData): Promise<CommandData> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Define fetch data
    const path: string = `/applications/${client.id}/guilds/${guildID}/commands`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawCommandData = await fetchQueue.request({
        path,
        method,
        data: {
            name: createCommandData.name,
            description: createCommandData.description,
            options: createCommandData.options
        }
    });

    // Parse command data
    const commandData: CommandData = Command._fromRawData(client, result, guildID);

    // Return
    return commandData;
}
import { Client, Command, CommandData, CommandOption, FetchQueue, RawCommandData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateCommandData {
    name: string;
    description: string;
    options?: CommandOption[];
}

export default async function createGlobalCommand(client: Client, createCommandData: CreateCommandData): Promise<CommandData> {

    // Define fetch data
    const path: string = `/applications/${client.id}/commands`;
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
    const commandData: CommandData = Command._fromRawData(client, result);

    // Return
    return commandData;
}
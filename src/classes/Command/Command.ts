import { Base, Client, CommandData, CommandOption, EditCommandData, RawCommandData } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
import resolveID from "./resolveID";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

/**
 * Command Resolvable
 *
 * The types that can be resolved to an command
 */
export type CommandResolvable = Command | CommandData | string;

export default class Command extends Base<Command> {

    /**
     * ID
     *
     * The command's ID
     */
    id: string;

    /**
     * Guild ID
     *
     * The ID of the guild this command is in
     */
    guildID: string | null;

    /**
     * Application ID
     *
     * The ID of the application that owns this command
     */
    applicationID: string;

    /**
     * Name
     *
     * The command's name
     */
    name: string;

    /**
     * Description
     *
     * The command's description
     */
    description: string;

    /**
     * Options
     *
     * The command's options
     */
    options: CommandOption[];

    /**
     * Command
     *
     * @param client The client
     * @param commandData.id The command's ID
     * @param commandData Options to initialize this command with
     * @param commandData.guildID The ID of the guild this command is in
     * @param commandData.applicationID The ID of the application that owns this command
     * @param commandData.name The command's name
     * @param commandData.description The command's description
     * @param commandData.options The command's options
     */
    constructor(client: Client, commandData: CommandData) {

        // Super
        super(client, {
            id: commandData.id,
            cacheManager: client._commands
        });

        // Set data
        Command._updateObject(this, commandData);

        // Cache command
        this.client._commands.cache(this.id, this);
    }

    /**
     * From Raw Data
     *
     * Create an `CommandData` object from a `RawCommandData` object
     *
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this command is in
     *
     * @returns {CommandData} The command data
     */
    static _fromRawData(client: Client, rawData: RawCommandData, guildID?: string): CommandData {
        return fromRawData(client, rawData, guildID);
    }

    /**
     * From Data
     *
     * Create an `Command` from an `CommandData` object
     *
     * @param client The client
     * @param commandData The command data
     *
     * @returns {Command} The command
     */
    static fromData(client: Client, commandData: CommandData): Command {
        return fromData(client, commandData);
    }

    /**
     * To Data
     *
     * Create an `CommandData` object from an `Command`
     *
     * @param command The command
     *
     * @returns {CommandData} The command data
     */
    static toData(command: Command): CommandData {
        return toData(command);
    }

    /**
     * Resolve ID
     *
     * Resolve an object to an command ID
     *
     * @param commandResolvable The command resolvable
     *
     * @returns {string | undefined} The resolved command ID, or `undefined` if the command resolvable is invalid
     */
    static resolveID(commandResolvable: CommandResolvable): string | undefined {
        return resolveID(commandResolvable);
    }

    /**
     * Update Object
     *
     * Update the `Command` object with data from an `CommandData` object
     *
     * @param command The command to update
     * @param commandData The data to update this command with
     */
    static _updateObject(command: Command, commandData: CommandData) {
        updateObject(command, commandData);
    }

    /**
     * Update Object From Data
     *
     * Update the `Command` object with data from an `CommandData` object if it's cached
     *
     * @param client The client
     * @param commandData The command data
     *
     * @returns {Command | undefined} The command
     */
    static _updateObjectFromData(client: Client, commandData: CommandData): Command | undefined {
        return updateObjectFromData(client, commandData);
    }

    /**
     * Edit
     *
     * Edit this command
     *
     * @param editCommandData The data for the command
     *
     * @returns {Promise<CommandData>} The command data
     */
    edit(editCommandData: EditCommandData): Promise<CommandData> {
        return this.guildID ? this.client.editGuildCommand(this.guildID, this, editCommandData) : this.client.editGlobalCommand(this, editCommandData);
    }

    /**
     * Delete
     *
     * Delete this command
     */
    delete(): Promise<void> {
        return this.guildID ? this.client.deleteGuildCommand(this.guildID, this) : this.client.deleteGlobalCommand(this);
    }
}
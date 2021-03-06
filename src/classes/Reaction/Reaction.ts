import { Client, Emoji, EmojiData, RawReactionData, RawReactionMetadata, ReactionData, ReactionEmoji } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import resolveString from "./resolveString";
import toData from "./toData";

/**
 * Reaction Emoji Resolvable
 *
 * The types that can be resolved to a reaction emoji
 */
export type ReactionEmojiResolvable = Reaction | ReactionData | Emoji | EmojiData | string;

export default class Reaction {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * Message ID
     *
     * The ID of the message this reaction is in
     */
    messageID: string;

    /**
     * Channel ID
     *
     * The ID of the channel this reaction is in
     */
    channelID: string;

    /**
     * Guild ID
     *
     * The ID of the guild this reaction is in
     * `null` if the reaction is in a DM channel
     */
    guildID?: string | null;

    /**
     * Count
     *
     * The amount of times this reaction has been used
     */
    count: number;

    /**
     * Me
     *
     * Whether or not the client has added this reaction
     */
    me: boolean;

    /**
     * Emoji
     *
     * The reaction's emoji
     */
    emoji: ReactionEmoji;

    /**
     * Reaction
     *
     * @param client The client
     * @param reactionData Options to initialize this reaction with
     * @param reactionData.count The amount of times this reaction has been used
     * @param reactionData.me Whether or not the client has added this reaction
     * @param reactionData.emoji The reaction's emoji
     */
    constructor(client: Client, reactionData: ReactionData) {

        // Set data
        Object.defineProperty(this, "client", { value: client });
        this.messageID = reactionData.messageID;
        this.channelID = reactionData.channelID;
        this.guildID = reactionData.guildID;
        this.count = reactionData.count;
        this.me = reactionData.me;
        this.emoji = reactionData.emoji;
    }

    /**
     * From Raw Data
     *
     * Create a `ReactionData` object from a `RawReactionData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     * @param metadata Metadata about the object
     *
     * @returns {Reaction} The reaction
     */
    static _fromRawData(client: Client, rawData: RawReactionData, metadata: RawReactionMetadata): Reaction {
        return Reaction.fromData(client, Reaction._dataFromRawData(rawData, metadata));
    }

    /**
     * Data From Raw Data
     *
     * Create a `ReactionData` object from a `RawReactionData` object
     *
     * @private
     * @param rawData The raw data from the API
     * @param metadata Metadata about the object
     *
     * @returns {ReactionData} The reaction data
     */
    static _dataFromRawData(rawData: RawReactionData, metadata: RawReactionMetadata): ReactionData {
        return dataFromRawData(rawData, metadata);
    }

    /**
     * From Data
     *
     * Create a `Reaction` from a `ReactionData` object
     *
     * @param client The client
     * @param reactionData The reaction data
     *
     * @returns {Reaction} The reaction
     */
    static fromData(client: Client, reactionData: ReactionData): Reaction {
        return fromData(client, reactionData);
    }

    /**
     * To Data
     *
     * Create a `ReactionData` object from a `Reaction`
     *
     * @param reaction The reaction
     *
     * @returns {ReactionData} The reaction data
     */
    static toData(reaction: Reaction): ReactionData {
        return toData(reaction);
    }

    /**
     * Resolve String
     *
     * Resolve an object to a reaction emoji string (`name:id` or unicode character)
     *
     * @param reactionEmojiResolvable The emoji resolvable
     *
     * @returns {string | undefined} The resolved reaction emoji string, or `undefined` if the reaction emoji resolvable is invalid
     */
    static resolveString(reactionEmojiResolvable: ReactionEmojiResolvable): string | undefined {
        return resolveString(reactionEmojiResolvable);
    }

    /**
     * Delete
     *
     * Remove these reactions
     */
    delete(): Promise<void> {
        return this.client.deleteAllReactionsForEmoji(this.channelID, this.messageID, this);
    }
}
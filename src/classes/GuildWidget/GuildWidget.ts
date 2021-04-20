import { Base, Client, GuildWidgetData, ModifyGuildWidgetData, RawGuildWidgetData, READY_STATE_READY } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

export default class GuildWidget extends Base<GuildWidget> {

    /**
     * Guild ID
     *
     * The ID of the guild this widget is for
     */
    get guildID(): string {
        return this.id;
    }

    /**
     * Enabled
     *
     * Whether or not the widget is enabled
     */
    enabled: boolean;

    /**
     * Channel ID
     *
     * The ID of the channel this widget is for
     */
    channelID: string | null;

    /**
     * Guild Widget
     *
     * @param client The client
     * @param guildWidgetData Options to initialize this widget with
     * @param guildWidgetData.guildID The ID of the guild this widget is for
     * @param guildWidgetData.enabled Whether or not the widget is enabled
     * @param guildWidgetData.channelID The ID of the channel this widget is for
     */
    constructor(client: Client, guildWidgetData: GuildWidgetData) {

        /**
         * Define Cache
         *
         * If we need to cache all bans and the clients ready state is `READY`
         * The ready state needs to be `READY` since the client might need to fetch data to cache initial objects
         */
        const cache: boolean = client._guildWidgets.cacheAll && client._readyState === READY_STATE_READY;

        // Super
        super(client, {
            id: guildWidgetData.guildID,
            cacheManager: client._guildWidgets,
            expiresFromCacheIn: cache ? (client._guildWidgets.cacheFor || null) : undefined
        });

        // Set data
        GuildWidget._updateObject(this, guildWidgetData);

        // Cache guild widget
        if (cache) this.client._guildWidgets.cache(this.id, this);
    }

    /**
     * From Raw Data
     *
     * Create a `GuildWidgetData` object from a `RawGuildWidgetData` object
     *
     * @param client The client
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this widget is for
     *
     * @returns {GuildWidget} The guild widget
     */
    static _fromRawData(client: Client, rawData: RawGuildWidgetData, guildID: string): GuildWidget {
        return GuildWidget.fromData(client, GuildWidget._dataFromRawData(rawData, guildID));
    }

    /**
     * Data From Raw Data
     *
     * Create a `GuildWidgetData` object from a `RawGuildWidgetData` object
     *
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this guild widget is in
     *
     * @returns {GuildWidgetData} The guild widget data
     */
    static _dataFromRawData(rawData: RawGuildWidgetData, guildID: string): GuildWidgetData {
        return dataFromRawData(rawData, guildID);
    }

    /**
     * From Data
     *
     * Create a `GuildWidget` from a `GuildWidgetData` object
     *
     * @param client The client
     * @param guildWidgetData The guild widget data
     *
     * @returns {GuildWidget} The guild widget
     */
    static fromData(client: Client, guildWidgetData: GuildWidgetData): GuildWidget {
        return fromData(client, guildWidgetData);
    }

    /**
     * To Data
     *
     * Create a `GuildWidgetData` object from a `GuildWidget`
     *
     * @param guildWidget The guild widget
     *
     * @returns {GuildWidgetData} The guild widget data
     */
    static toData(guildWidget: GuildWidget): GuildWidgetData {
        return toData(guildWidget);
    }

    /**
     * Update Object
     *
     * Update the `GuildWidget` object with data from a `GuildWidgetData` object
     *
     * @param guildWidget The guild widget to update
     * @param guildWidgetData The data to update this guild widget with
     */
    static _updateObject(guildWidget: GuildWidget, guildWidgetData: GuildWidgetData) {
        updateObject(guildWidget, guildWidgetData);
    }

    /**
     * Update Object From Data
     *
     * Update the `GuildWidget` object with data from a `GuildWidgetData` object if it's cached
     *
     * @param client The client
     * @param guildWidgetData The guild widget data
     *
     * @returns {GuildWidget | undefined} The guild widget
     */
    static _updateObjectFromData(client: Client, guildWidgetData: GuildWidgetData): GuildWidget | undefined {
        return updateObjectFromData(client, guildWidgetData);
    }

    /**
     * Cache
     *
     * Cache this `GuildWidget`
     */
    cache() {
        this.client._guildWidgets.cache(this.id, this);
    }

    /**
     * Edit
     *
     * Edit this guild widget
     *
     * @param modifyGuildWidgetData The data to modify the guild's widget
     *
     * @returns {Promise<GuildWidget>} The modified guild widget
     */
    edit(modifyGuildWidgetData: ModifyGuildWidgetData): Promise<GuildWidget> {
        return this.client.modifyGuildWidget(this.guildID, modifyGuildWidgetData);
    }
}
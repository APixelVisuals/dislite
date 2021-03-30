import { Client, Emoji, Guild, RawEmojiData } from "../../../../internal";
import { GuildEmojisUpdateData } from "./guildEmojisUpdateData";
import { RawGuildEmojisUpdateData } from "./rawGuildEmojisUpdateData";

export default function guildEmojisUpdate(client: Client, rawData: RawGuildEmojisUpdateData) {

    // Parse data
    const data: GuildEmojisUpdateData = {
        guildID: rawData.guild_id,
        emojis: rawData.emojis.map((e: RawEmojiData) => Emoji._fromRawData(client, e, rawData.guild_id))
    };

    // Get guild
    const guild: Guild | undefined = client.guilds.get(data.guildID);

    // Update emojis
    if (guild) guild.emojiData = data.emojis;

    // Emit event
    client.emit("guildEmojisUpdate", data, {
        rawData,
        guild
    });
}
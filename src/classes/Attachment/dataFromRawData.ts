import { AttachmentData, RawAttachmentData, RawAttachmentMetadata } from "../../internal";

export default function dataFromRawData(rawData: RawAttachmentData, metadata: RawAttachmentMetadata): AttachmentData {

    // Parse attachment data
    return {
        id: rawData.id,
        messageID: metadata.messageID,
        channelID: metadata.channelID,
        guildID: metadata.guildID,
        filename: rawData.filename,
        contentType: rawData.content_type,
        size: rawData.size,
        url: rawData.url,
        proxyURL: rawData.proxy_url,
        width: rawData.width || null,
        height: rawData.height || null
    };
}
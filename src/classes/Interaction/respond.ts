import { CreateInteractionMessageData, Embed, Interaction, INTERACTION_RESPONSE_TYPE_MESSAGE, Message } from "../../internal";

export default function respond(interaction: Interaction, contentOrData: string | Embed | CreateInteractionMessageData, createInteractionMessageData: CreateInteractionMessageData = {}): Promise<Message | undefined> {

    // Parse data
    if (typeof contentOrData === "string") createInteractionMessageData.content = contentOrData;
    else if (contentOrData instanceof Embed) createInteractionMessageData.embeds = [contentOrData];
    else createInteractionMessageData = contentOrData;

    // Create response
    return interaction.client.createInteractionResponse(interaction, interaction.token, {
        type: INTERACTION_RESPONSE_TYPE_MESSAGE,
        data: createInteractionMessageData
    });
}
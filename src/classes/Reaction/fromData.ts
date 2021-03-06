import { Client, Reaction, ReactionData } from "../../internal";

export default function fromData(client: Client, reactionData: ReactionData): Reaction {

    // Create reaction
    const reaction: Reaction = new Reaction(client, reactionData);

    // Return
    return reaction;
}
import { RawUserData } from "../../internal";

export interface RawEmojiData {
    id: string;
    name: string;
    animated?: boolean;
    managed?: boolean;
    available?: boolean;
    user?: RawUserData;
    require_colons?: boolean;
    roles?: string[];
}
import { Feature, GuildChannelType, RawMemberData, RawUserData, TargetType, VerificationLevel } from "../../internal";

export interface RawInviteData {
    code: string;
    channel: RawInviteDataChannel;
    guild: RawInviteDataGuild;
    created_at?: string;
    inviter?: RawUserData;
    max_age?: number;
    max_uses?: number;
    temporary?: boolean;
    uses?: number;
    expires_at?: string | null;
    target_type?: TargetType;
    target_user?: RawInviteDataTargetUser;
    stage_instance?: RawInviteDataStageInstance;
}

export interface RawInviteDataChannel {
    id: string;
    name: string;
    type: GuildChannelType;
}

export interface RawInviteDataGuild {
    id: string;
    name: string;
    icon: string | null;
    splash: string | null;
    verification_level: VerificationLevel;
    features: Feature[];
    vanity_url_code: string | null;
    description: string | null;
    banner: string | null;
}

export interface RawInviteDataTargetUser {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
}

export interface RawInviteDataStageInstance {
    topic: string;
    participant_count: number;
    speaker_count: number;
    members: RawMemberData[];
}
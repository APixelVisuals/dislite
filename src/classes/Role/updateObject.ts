import { Role, RoleData } from "../../internal";

export default function updateObject(role: Role, roleData: RoleData) {

    // If the `RoleData` was fetched before the `Role` object was last updated, dont update anything
    if (roleData.fetchedAt < role._lastUpdatedAt) return;

    // Unmark as deleted
    if (role.deleted) role._unmarkAsDeleted();

    // Set data
    role.name = roleData.name;
    role.guildID = roleData.guildID;
    role.color = roleData.color;
    role.hoist = roleData.hoist;
    role.position = roleData.position;
    role.permissions = roleData.permissions;
    role.mentionable = roleData.mentionable;
    role.managed = roleData.managed;
    role.tags = roleData.tags;
    role._lastUpdatedAt = Date.now();
}
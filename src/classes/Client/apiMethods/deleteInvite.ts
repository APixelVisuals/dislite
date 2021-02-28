import { Client, FetchQueue, Invite, InviteResolvable, RawInviteData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteInvite(client: Client, inviteResolvable: InviteResolvable): Promise<Invite> {

    // Resolve objects
    const resolveCode: string = Invite.resolveCode(inviteResolvable);

    // Define fetch data
    const path: string = `/invites/${resolveCode}`;
    const method: string = "DELETE";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawInviteData = await fetchQueue.request({
        path,
        method
    });

    // Parse invite
    const invite: Invite = Invite._fromRawData(client, result);

    // Return
    return invite;
}
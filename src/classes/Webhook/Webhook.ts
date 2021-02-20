import { Client } from "../../internal";

export interface WebhookData {
    id: string;
    username: string;
    avatar?: string;
}

export default class Webhook {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * ID
     *
     * The webhook's ID
     */
    id: string;

    /**
     * Username
     *
     * The webhook's username
     */
    username: string;

    /**
     * Avatar
     *
     * The webhook's avatar
     */
    avatar?: string;

    /**
     * Webhook
     *
     * @param client The client
     * @param webhookData Options to initialize this webhook with
     * @param webhookData.id The webhook's ID
     * @param webhookData.username The webhook's username
     * @param webhookData.avatar The webhook's avatar
     */
    constructor(client: Client, webhookData: WebhookData) {

        // Set data
        this.client = client;
        this.id = webhookData.id;
        this.username = webhookData.username;
        this.avatar = webhookData.avatar;
    }
}
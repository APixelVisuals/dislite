import { CacheManager, Client, GetResult } from "../../internal";
import clear from "./clear";
import get from "./get";
import uncache from "./uncache";

export interface CacheManagerInterfaceData<CachedObject> {
    cacheManager: CacheManager<CachedObject>;
    match?: MatchFunction<CachedObject>;
}

export type MatchFunction<CachedObject> = (object: CachedObject) => boolean;

/**
 * Cache Manager Interface
 *
 * Class properties use `CacheManagerInterface`s as a way to access cached data related to the class
 * Each `CacheManagerInterface` has a type of object it caches (`CachedObject`)
 * For example, `Guild.channels` has a `CacheManagerInterface<AnyChannel>`
 *
 * Note that the `Client` uses `CacheManager`s as a central location for cached data
 */
export default class CacheManagerInterface<CachedObject> {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * Cache Manager
     *
     * The cache manager
     */
    _cacheManager: CacheManager<CachedObject>;

    /**
     * Match
     *
     * The function to use to check if an object is a valid match for the cache manager interface
     *
     * For example, with a `CacheManagerInterface<AnyChannel>` on `Guild.channels`, `CacheManagerInterface.get()` would check `Client.channels` for the `id`
     * This could potentially return a channel that isnt in the right guild
     * The `match` function is what should be used to ensure that the channel is from the right guild
     */
    _match?: MatchFunction<CachedObject>;

    /**
     * Cache Manager Interface
     *
     * @param client The client
     * @param cacheManagerInterfaceData Options to initialize this cache manager interface with
     * @param cacheManagerInterfaceData.cacheManager The cache manager
     * @param cacheManagerInterfaceData.match The function to use to check if an object is a valid match for the cache manager interface
     */
    constructor(client: Client, cacheManagerInterfaceData: CacheManagerInterfaceData<CachedObject>) {

        // Set data
        this.client = client;
        this._cacheManager = cacheManagerInterfaceData.cacheManager;
        this._match = cacheManagerInterfaceData.match;
    }

    /**
     * Get
     *
     * Get an object from cache
     *
     * @param id The ID of the object
     * @param fetch Whether or not to fetch this object from the API if it isn't cached
     *
     * @returns {CachedObject | Promise<CachedObject> | undefined} The cached object or `undefined` if it doesn't exist
     */
    get<Fetch extends boolean = false>(id: string, fetch?: Fetch): GetResult<CachedObject, Fetch> {
        return get<CachedObject, Fetch>(this, id, fetch);
    }

    /**
     * Uncache
     *
     * Remove an object from cache
     *
     * @param id The ID of the object
     */
    uncache(id: string) {
        uncache<CachedObject>(this, id);
    }

    /**
     * Filter
     *
     * Filter the cache
     *
     * @param predicate The function to filter the cache
     * @param modify Modify the cache to meet the filter's requirements
     *
     * @returns {Map<string, CachedObject>} The filtered cache
     */
    filter(predicate: (value: CachedObject, index: number) => any, modify?: boolean): Map<string, CachedObject> {
        return this._cacheManager.filter((value: CachedObject, index: number) => this._match ? (this._match(value) && predicate(value, index)) : (predicate(value, index)), modify);
    }

    /**
     * Clear
     *
     * Clear the cache
     */
    clear() {
        clear<CachedObject>(this);
    }
}
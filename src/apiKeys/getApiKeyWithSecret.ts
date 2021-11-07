import { ApiKey } from "./apiKey";

/**
 * Response object when a new API key is created.
 * Note that the only time you will be able to see the API key is on creation.
 * After that you will not be able to retrieve it back from the system.
 */
export interface GetApiKeyWithSecret extends Pick<ApiKey, 'name' | 'description' | 'prefix' | 'userId'> {
    id: string;
    /**
     * This is the secret API key. 
     * Note that this can only be shown on creation after that you will not be able to retrieve it again.
     * If the key is lost, you should delete the entry which has the matching prefix.
     * Then you can create another key.
     */
    apiKey: string;
}
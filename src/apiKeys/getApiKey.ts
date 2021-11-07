import { ApiKey } from "./apiKey";


export interface GetApiKey extends Pick<ApiKey, 'prefix' | 'name' | 'description' | 'userId'> {
    id: string
}
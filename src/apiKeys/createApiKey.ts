import { ApiKey } from "./apiKey";

export interface CreateApiKey extends Pick<ApiKey, 'name' | 'description'> {

}

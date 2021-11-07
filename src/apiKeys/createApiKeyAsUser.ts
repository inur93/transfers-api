import { CreateApiKey } from "./createApiKey";

export interface CreateApiKeyAsUser extends CreateApiKey {
    userId: string
}

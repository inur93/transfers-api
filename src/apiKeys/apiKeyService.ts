import { provideSingleton } from "../util/provideSingleton";
import security from "../util/security";
import ApiKeyModel, { ApiKey, ApiKeyWithSecret } from "./apiKey";
import { CreateApiKeyAsUser } from "./createApiKeyAsUser";

@provideSingleton(ApiKeyService)
export class ApiKeyService {

    public async create(data: CreateApiKeyAsUser): Promise<ApiKeyWithSecret> {
        // const prefix = await security.generateApiKeyPrefix();
        const key = await security.generateApiKey();
        const prefix = await security.getApiKeyPrefix(key);
        const hash = await security.hash(key);
        const created = await ApiKeyModel.create({
            ...data,
            hash,
            prefix
        });

        return {
            ...created.toObject(),
            apiKey: key
        }
    }

    public async getByUser(userId: string): Promise<ApiKey[]> {
        return await ApiKeyModel.find({ userId }).exec();
    }

    public async delete(id: string): Promise<void> {
        await ApiKeyModel.deleteOne({ _id: id });
    }
}

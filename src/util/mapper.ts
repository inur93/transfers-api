import { ApiKey, ApiKeyWithSecret } from "../apiKeys/apiKey";
import { GetApiKey } from "../apiKeys/getApiKey";
import { GetApiKeyWithSecret } from "../apiKeys/getApiKeyWithSecret";
import { Transfer } from "../transfers/transfer";
import { User } from "../users/user";
import { FindTransfer } from "../viewModels/transfers/findTransfer";
import { GetUser } from "../viewModels/users/getUser";


class Mapper {

    public toGetUser({ _id, email, name, roles }: User): GetUser {
        return { id: _id.toJSON(), email, name, roles }
    }

    public toFindTransfer({ _id, ...other }: Transfer): FindTransfer {
        return {
            id: _id.toJSON(),
            ...other
        }
    }

    public toGetApiKeyWithSecret({ _id, description, name, prefix, apiKey, userId }: ApiKeyWithSecret): GetApiKeyWithSecret {
        return {
            userId,
            id: _id.toJSON(),
            name,
            description,
            prefix,
            apiKey
        }
    }

    public toGetApiKey({ _id, prefix, name, description, userId }: ApiKey): GetApiKey {
        return {
            id: _id.toJSON(),
            userId,
            prefix,
            name,
            description,
        }
    }
}

export default new Mapper();
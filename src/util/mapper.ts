import { ApiKey, ApiKeyWithSecret } from "../apiKeys/apiKey";
import { GetApiKey } from "../apiKeys/getApiKey";
import { GetApiKeyWithSecret } from "../apiKeys/getApiKeyWithSecret";
import { Club } from "../clubs/club";
import { FindClub } from "../clubs/clubViewModels";
import { Player } from "../players/player";
import { FindPlayer } from "../players/playerViewModels";
import { Transfer } from "../transfers/transfer";
import { FindTransfer } from "../transfers/transferViewModels";
import { User } from "../users/user";
import { GetUser } from "../users/userViewModels";


class Mapper {

    public toGetUser({ _id, email, name, roles }: User): GetUser {
        return { id: _id.toJSON(), email, name, roles }
    }

    public toFindTransfer({ _id, date, fee, fromClub, marketValue, player, tmId, toClub, transferLink }: Transfer): FindTransfer {
        return {
            id: _id.toJSON(),
            tmId,
            transferLink,
            player,
            date,
            fromClub,
            toClub,
            fee,
            marketValue
        }
    }

    public toFindClub({ _id, tmId, name }: Club): FindClub {
        return {
            id: _id.toJSON(),
            tmId,
            name
        }
    }

    public toFindPlayer({ _id, citizenShip, currentClub, dateOfBirth, name, nationality, foot, height, link, position, shortName, tmId }: Player): FindPlayer {
        return {
            id: _id.toJSON(),
            tmId,
            link,
            name,
            shortName,
            nationality,
            citizenShip,
            currentClub,
            dateOfBirth,
            foot,
            position,
            height
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
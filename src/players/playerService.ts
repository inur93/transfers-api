import { PagedList } from "../common/pagedList";
import { provideSingleton } from "../util/provideSingleton";
import PlayerModel, { Player } from "./player";
import { PlayerQuery } from "./playerQueries";

@provideSingleton(PlayerService)
export class PlayerService {
    public async find({ limit, page }: PlayerQuery): Promise<PagedList<Player>> {

        const rows = await PlayerModel.find({})
            .sort('tmId')
            .skip(page * limit)
            .limit(limit)
            .exec();

        const count = await PlayerModel.count();

        return {
            count,
            data: rows.map(x => x.toObject())
        }
    }

}
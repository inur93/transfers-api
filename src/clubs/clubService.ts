import { PagedList } from "../common/pagedList";
import { provideSingleton } from "../util/provideSingleton";
import ClubModel, { Club } from "./club";
import { ClubQuery } from "./clubQueries";

@provideSingleton(ClubService)
export class ClubService {
    public async find({ limit, page }: ClubQuery): Promise<PagedList<Club>> {

        const rows = await ClubModel.find({})
            .sort('tmId')
            .skip(page * limit)
            .limit(limit)
            .exec();

        const count = await ClubModel.count();

        return {
            count,
            data: rows.map(x => x.toObject())
        }
    }

}
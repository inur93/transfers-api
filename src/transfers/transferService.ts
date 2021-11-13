import { PagedList } from "../common/pagedList";
import { provideSingleton } from "../util/provideSingleton";
import TransferModel, { Transfer } from './transfer';
import { TransferQuery } from "./transferQueries";

@provideSingleton(TransfersService)
export class TransfersService {
    public async find({ limit, page, from, to, clubs }: TransferQuery): Promise<PagedList<Transfer>> {

        const query: any = {};
        if (from && to) {
            query.$and = [
                { date: { $gte: from } },
                { date: { $lt: to } },
            ];
        } else if (from) {
            query.date = { $gte: from };
        } else if (to) {
            query.date = { $lt: from };
        }

        if (clubs) {
            const clubQuery = {
                $or: [
                    { fromClub: { $in: clubs } },
                    { toClub: { $in: clubs } }
                ]
            }
            if (query.$and) {
                query.$and.push(clubQuery);
            } else {
                query.$and = [clubQuery];
            }
        }

        const rows = await TransferModel.find(query)
            .sort('date')
            .skip(page * limit)
            .limit(limit)
            .exec();

        const count = await TransferModel.count(query);

        return {
            count,
            data: rows.map(x => x.toObject())
        }
    }

}
import { PagedList } from "../common/pagedList";
import { provideSingleton } from "../util/provideSingleton";
import TransferModel, { Transfer } from './transfer';
import { TransferQuery } from "./transferQueries";

@provideSingleton(TransfersService)
export class TransfersService {
    public async find({ limit, page }: TransferQuery): Promise<PagedList<Transfer>> {

        const rows = await TransferModel.find({})
            .sort('date')
            .skip(page * limit)
            .limit(limit)
            .exec();

        const count = await TransferModel.count();

        return {
            count,
            data: rows.map(x => x.toObject())
        }
    }

}
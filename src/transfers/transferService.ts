import { provideSingleton } from "../util/provideSingleton";
import { PagedList } from "../viewModels/pagedList";
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
            data: rows
        }
    }

}
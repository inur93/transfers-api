import { inject } from "inversify";
import mapper from "../util/mapper";
import {
    Controller,
    Get, Query, Route, Security, Tags
} from "tsoa";
import { provideSingleton } from '../util/provideSingleton';
import { TransfersService } from "./transferService";
import { FindTransfer } from "./transferViewModels";
import { PagedList } from "../common/pagedList";


@Tags('Common')
@Security('api_key')
@Route("transfers")
@provideSingleton(TransfersController)
export class TransfersController extends Controller {

    constructor(
        @inject(TransfersService) private service: TransfersService
    ) {
        super();
    }

    /**
     * 
     * @param page should be greater or equal to 0
     * @param limit should be greater than 0 and maximum 1000
     * @param from limit the number of transfers by specifying a period for which to retrieve transfers for by using the from and to parameters.
     * from is inclusive and does not require that 'to' is specified
     * @param to limit the number of transfers by specifying a period for which to retrieve transfers for by using the from and to parameters.
     * to is exclusive and does not require that 'from' is specified
     * @param clubs specify a list of clubs for which you want to get transfers from.
     * @isInt page 
     * @minimum page 0
     * 
     * @isInt limit 
     * @minimum limit 1
     * @maximum limit 1000
     */
    @Get("")
    public async findTransfers(
        @Query() page: number,
        @Query() limit: number,
        @Query() from?: Date,
        @Query() to?: Date,
        @Query() clubs?: string[]
    ): Promise<PagedList<FindTransfer>> {
        // let clubQuery;
        // if (clubs) {
        //     clubQuery = clubs.split(',').map(x => x.trim());
        // }
        const pagedResults = await this.service.find({ page, limit, from, to, clubs });
        return {
            count: pagedResults.count,
            data: pagedResults.data.map(mapper.toFindTransfer)
        }
    }

}
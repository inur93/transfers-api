import { inject } from "inversify";
import mapper from "../util/mapper";
import {
    Controller,
    Get, Query, Route, Security, Tags
} from "tsoa";
import { provideSingleton } from '../util/provideSingleton';
import { FindTransfer } from '../viewModels/transfers/findTransfer';
import { TransfersService } from "./transferService";
import { PagedList } from "../viewModels/pagedList";


@Tags('Transfers')
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
     * 
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
        @Query() limit: number
    ): Promise<PagedList<FindTransfer>> {
        const pagedResults = await this.service.find({ page, limit });
        return {
            count: pagedResults.count,
            data: pagedResults.data.map(mapper.toFindTransfer)
        }
    }

}
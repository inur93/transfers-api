import { inject } from "inversify";
import mapper from "../util/mapper";
import {
    Controller,
    Get, Query, Route, Security, Tags
} from "tsoa";
import { provideSingleton } from '../util/provideSingleton';
import { PlayerService } from "./playerService";
import { PagedList } from "../common/pagedList";
import { FindPlayer } from "./playerViewModels";


@Tags('Common')
@Security('api_key')
@Route("players")
@provideSingleton(PlayerController)
export class PlayerController extends Controller {

    constructor(
        @inject(PlayerService) private service: PlayerService
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
    public async findPlayers(
        @Query() page: number,
        @Query() limit: number
    ): Promise<PagedList<FindPlayer>> {
        const pagedResults = await this.service.find({ page, limit });
        return {
            count: pagedResults.count,
            data: pagedResults.data.map(mapper.toFindPlayer)
        }
    }

}
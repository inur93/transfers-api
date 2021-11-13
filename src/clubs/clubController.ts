import { inject } from "inversify";
import mapper from "../util/mapper";
import {
    Controller,
    Get, Query, Route, Security, Tags
} from "tsoa";
import { provideSingleton } from '../util/provideSingleton';
import { ClubService } from "./clubService";
import { PagedList } from "../common/pagedList";
import { FindClub } from "./clubViewModels";


@Tags('Common')
@Security('api_key')
@Route("clubs")
@provideSingleton(ClubController)
export class ClubController extends Controller {

    constructor(
        @inject(ClubService) private service: ClubService
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
    public async findClubs(
        @Query() page: number,
        @Query() limit: number
    ): Promise<PagedList<FindClub>> {
        const pagedResults = await this.service.find({ page, limit });
        return {
            count: pagedResults.count,
            data: pagedResults.data.map(mapper.toFindClub)
        }
    }

}
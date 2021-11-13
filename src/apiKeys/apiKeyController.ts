import * as express from 'express';
import { inject } from 'inversify';
import {
    Body,
    Controller,
    Get,
    Path,
    Post, Request, Response, Route, Security, SuccessResponse, Tags
} from "tsoa";
import { UnauthorizedException } from '../exceptions/unauthorized';
import { GetUser } from '../users/userViewModels';
import mapper from '../util/mapper';
import { provideSingleton } from '../util/provideSingleton';
import { ApiKeyService } from './apiKeyService';
import { CreateApiKey } from './createApiKey';
import { GetApiKey } from './getApiKey';
import { GetApiKeyWithSecret } from './getApiKeyWithSecret';


@Tags('Api key management')
@Security("jwt", ['Everyone'])
@Response<UnauthorizedException>(401, "Unauthorized")
@Route("api-key")
@provideSingleton(ApiKeyController)
export class ApiKeyController extends Controller {

    constructor(
        @inject(ApiKeyService) private service: ApiKeyService
    ) {
        super();
    }

    /**
     * As admin you can get Api keys for any users.
     * @param userId the unique id of the user
     */
    @Security("jwt", ['Admin'])
    @Get("{userId}")
    public async getApiKeysForUser(
        @Path() userId: string
    ): Promise<GetApiKey[]> {
        const apiKeys = await this.service.getByUser(userId);
        return apiKeys.map(mapper.toGetApiKey);
    }

    /**
     * Create an API which can be used to access all the Transfer endpoints.
     * Note that the only time you will see the API key is in the response of this endpoint.
     * Remember to store it somewhere safe.
     * @param requestBody 
     * @param request 
     * @returns
     */
    @SuccessResponse("201", "Created")
    @Post()
    public async createApiKey(
        @Body() requestBody: CreateApiKey,
        @Request() request: express.Request & { user: GetUser }
    ): Promise<GetApiKeyWithSecret> {
        this.setStatus(201); // set return status 201
        const created = await this.service.create({
            ...requestBody,
            userId: request.user.id
        });
        return mapper.toGetApiKeyWithSecret(created);
    }
}

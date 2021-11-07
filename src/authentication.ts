import * as express from "express";
import * as jwt from "jsonwebtoken";
import { MissingApiKeyException } from "./exceptions/missingApiKey";
import { UnauthorizedException } from "./exceptions/unauthorized";
import ApiKeyModel from './apiKeys/apiKey';
import security from "./util/security";

async function handleApiToken(request: express.Request): Promise<any> {
    const token = request.headers['x-api-key'] as string || '';
    console.log('headers', request.headers);
    if (!token) {
        throw new MissingApiKeyException();
    }

    const prefix = await security.getApiKeyPrefix(token);
    const results = await ApiKeyModel.find({ prefix });
    for (let result of results) {
        const match = await security.comparePassword(token, result.hash);
        if(match){
            return request;
        }
    }

    throw new UnauthorizedException('The API key was not valid');
}

function handleJwtToken(request: express.Request, scopes?: string[]): Promise<any> {
    const bearer = request.headers["authorization"] as string;
    const token = bearer && bearer.split(' ').length > 1 && bearer.split(' ')[1] || '';

    return new Promise((resolve, reject) => {
        if (!token) {
            reject(new Error("No token provided"));
        }
        jwt.verify(token, process.env.JWT_SECRET || '', function (err: any, decoded: any) {
            if (err) {
                reject(new UnauthorizedException(err));
            } else {
                // Check if JWT contains all required scopes
                if (scopes) {
                    for (let scope of scopes) {
                        if (!decoded.roles?.includes(scope)) {
                            reject(new UnauthorizedException(`JWT does not contain required scope ${scope}`, scope));
                        }
                    }
                }
                resolve(decoded);
            }
        });
    });
}

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {

    if (securityName === "api_key") {
        return handleApiToken(request);
    }

    if (securityName === "jwt") {
        return handleJwtToken(request, scopes);
    }

    return Promise.resolve();
}

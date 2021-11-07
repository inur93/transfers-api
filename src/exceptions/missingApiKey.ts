import { BaseError } from "./baseException";


/**
 * The API key was not present in the "X-API-KEY" header.
 * @example {
 *  "message": "No API key present in the 'X-API-KEY' header",
 *  "code": "missing_api_key",
 *  "details": {
 *  }
 * }
 */
export class MissingApiKeyException extends BaseError<{}> {

    constructor() {
        super(
            401,
            `No API key present in the 'X-API-KEY' header`,
            "missing_api_key",
            {}
        );
    }
}
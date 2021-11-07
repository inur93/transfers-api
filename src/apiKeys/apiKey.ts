import { Document, Model, model, models, Schema, Types } from 'mongoose';

export interface ApiKey {
    /**
     * Generated id by Mongo
     */
    _id: Types.ObjectId;
    prefix: string;
    hash: string;
    userId: string;
    name: string;
    description: string;
}

export interface ApiKeyWithSecret extends ApiKey {
    apiKey: string;
}

const ApiKeySchemaFields: Record<keyof Omit<ApiKey, '_id'>, any> = {
    name: String,
    description: String,
    userId: String,
    prefix: {
        type: String,
        unique: true
    },
    hash: {
        type: String,
        unique: true
    }
}

export interface ApiKeyDoc extends Omit<ApiKey, '_id'>, Document { }
export interface ApiKeyModel extends Model<ApiKeyDoc> { }
export const ApiKeySchema = new Schema<ApiKeyDoc, ApiKeyModel>(ApiKeySchemaFields);
export default models.ApiKey || model<ApiKeyDoc>('ApiKey', ApiKeySchema);
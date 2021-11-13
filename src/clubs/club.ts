import { Document, Model, model, models, Schema, Types } from 'mongoose';

export interface Club {
    /**
     * Generated id by Mongo
     */
    _id: Types.ObjectId;
    tmId: string;
    name: string;
}

const ClubSchemaFields: Record<keyof Omit<Club, '_id'>, any> = {
    tmId: {
        type: String,
        unique: true
    },
    name: String,
}

export interface ClubDoc extends Omit<Club, '_id'>, Document { }
export interface ClubModel extends Model<ClubDoc> { }
export const ClubSchema = new Schema<ClubDoc, ClubModel>(ClubSchemaFields);
export default models.Club || model<ClubDoc>('Club', ClubSchema);
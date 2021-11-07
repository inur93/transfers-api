import { Document, Model, model, models, Schema, Types } from 'mongoose';
import { Money, MoneySchemaFields } from './money';

export interface Transfer {
    /**
     * Generated id by Mongo
     */
    _id: Types.ObjectId;
    tmId: string;
    date: Date;
    transferLink: string;
    player: string;
    fromClub: string;
    toClub: string;

    marketValue: Money,
    fee: Money,
    
}

const TransferSchemaFields: Record<keyof Omit<Transfer, '_id'>, any> = {
    tmId: {
        type: String,
        unique: true
    },
    date: Date,
    transferLink: String,
    marketValue: MoneySchemaFields,
    fee: MoneySchemaFields,
    fromClub: String,
    toClub: String,
    player: String
}

export interface TransferDoc extends Omit<Transfer, '_id'>, Document { }
export interface TransferModel extends Model<TransferDoc> { }
export const TransferSchema = new Schema<TransferDoc, TransferModel>(TransferSchemaFields);
export default models.Transfer || model<TransferDoc>('Transfer', TransferSchema);
import { Document, Model, model, models, Schema, Types } from 'mongoose';

export interface Player {
    /**
     * Generated id by Mongo
     */
    _id: Types.ObjectId;
    tmId: string;
    name: string;
    shortName: string;
    age: number,
    dateOfBirth: Date;
    height: number;
    foot: string;
    nationality: string;
    citizenShip: string;
    position: string[];
    currentClub: string;
}

const PlayerSchemaFields: Record<keyof Omit<Player, '_id'>, any> = {
    tmId: {
        type: String,
        unique: true
    },
    name: String,
    shortName: String,
    age: Number,
    dateOfBirth: Date,
    height: Number,
    foot: String,
    nationality: String,
    citizenShip: String,
    position: [String],
    currentClub: String
}

export interface PlayerDoc extends Omit<Player, '_id'>, Document { }
export interface PlayerModel extends Model<PlayerDoc> { }
export const PlayerSchema = new Schema<PlayerDoc, PlayerModel>(PlayerSchemaFields);
export default models.Player || model<PlayerDoc>('Player', PlayerSchema);
import { Club } from "./club";

/**
 * @example {
 *  "id": "617f0022093fae385642f6a1",
 *  "tmId": "865",
 *  "name": "FC Midtjylland"
 * }
 */
export interface FindClub extends Pick<Club, 'tmId' | 'name'> {
    id: string
}
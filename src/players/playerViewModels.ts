import { Player } from "./player";

/**
 * @example {
 *  "id": "617f0022093fae385642f6a1",
 *  "tmId": "1234",
 *  "name": "Pione Sisto Ifolo Emirmija",
 *  "shortName": "Pione Sisto",
 *  "dateOfBirth": "1995-02-04T00:00:00.000Z",
 *  "height": "1.72",
 *  "foot": "right",
 *  "nationality": "Denmark",
 *  "citizenShip": "Denmark",
 *  "position": ["attack", "Left Winger"],
 *  "currentClub": "865",
 *  "link": "https://www.transfermarkt.com/pione-sisto/profil/spieler/252641"
 * }
 */
export interface FindPlayer extends Pick<Player, 'tmId' | 'name' | 'shortName' | 'dateOfBirth' | 'height' | 'foot' | 'nationality' | 'citizenShip' | 'position' | 'currentClub' | 'link'> {
    id: string
}
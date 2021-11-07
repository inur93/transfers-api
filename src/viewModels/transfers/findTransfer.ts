import { Money } from "../../transfers/money";

/**
 * @example {
 *  "id": "617f0022093fae385642f6a1",
 *  "tmId": "1234",
 *  "date": "2021-11-03T00:00:00.000Z",
 *  "transferLink": "https://www.transfermarkt.com/pione-sisto/transfers/spieler/252641/transfer_id/3046446",
 *  marketValue: {
 *      "currency": "€",
 *      "amount": 1000000,
 *      "comment": "free transfer"
 *  },
 *  fee: {
 *      "currency": "€",
 *      "amount": 2000000,
 *      "comment": "not disclosed"
 *  },
 *  fromClub: "123",
 *  toClub: "321",
 *  player: "1423"
 * }
 */
export interface FindTransfer {
    id: string;
    tmId: string;
    date: Date;
    transferLink: string;
    marketValue: Money;
    fee: Money;
    fromClub: string;
    toClub: string;
    player: string;
}


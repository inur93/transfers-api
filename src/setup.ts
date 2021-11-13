import ClubModel from './clubs/club';
import PlayerModel from './players/player';
import TransferModel from './transfers/transfer';
import UserModel, { Role } from './users/user';
import security from './util/security';
export class Setup {

    public async initializeApp() {
        await this.setupUser();
        if (process.env.INIT_DATA === 'true') {
            await this.setupPlayer();
            await this.setupTransfers();
            await this.setupClub();
        }
    }

    private async setupUser() {
        const email = process.env.DEFAULT_ADMIN_EMAIL;
        const password = process.env.DEFAULT_ADMIN_PASSWORD;
        const name = process.env.DEFAULT_ADMIN_NAME || 'Administrator';

        if (!email || !password || await UserModel.exists({ email })) {
            console.log('skipping admin creation', email);
            return;
        }

        const hash = await security.hash(password);
        await UserModel.create({
            email,
            hash,
            name,
            roles: [Role.Admin, Role.Everyone]
        })
    }

    private async setupPlayer() {

        const exists = await PlayerModel.exists({ tmId: '252641' });

        if (exists) {
            console.log('skipping player creation');
            return;
        }

        await PlayerModel.create({
            "dateOfBirth": "1995-02-04T00:00:00.000Z",
            "height": 1.72,
            "position": ["attack", "Left Winger"],
            "foot": "right",
            "currentClub": "865",
            "citizenShip": "Denmark",
            "tmId": "252641",
            "link": "https://www.transfermarkt.com/pione-sisto/profil/spieler/252641",
            "shortName": "Pione Sisto",
            "name": "Pione Sisto Ifolo Emirmija",
            "currentClubName": "FC Midtjylland",
            "statistics": []
        })
    }

    private async setupTransfers() {
        const transfers = [
            {
                "date": "2020-09-04T22:00:00.000Z",
                "transferLink": "",
                "marketValue": {
                    "currency": "€",
                    "amount": 4800000,
                    "comment": ""
                },
                "fromClub": "940",
                "toClub": "865",
                "fee": {
                    "currency": "€",
                    "amount": 2500000,
                    "comment": ""
                },
                "player": "252641",
                "tmId": "3046446"
            }
        ]

        for (let transfer of transfers) {
            const exists = await TransferModel.exists({ tmId: transfer.tmId });
            if (!exists) {
                await TransferModel.create(transfer);
            }
        }
    }

    private async setupClub() {
        const clubs = [
            { "tmId": "940", "name": "Celta de Vigo" },
            { "tmId": "865", "name": "FC Midtjylland" }
        ]

        for (let club of clubs) {
            const exists = await ClubModel.exists({ tmId: club.tmId });
            if (!exists) {
                await ClubModel.create(club);
            }
        }
    }
}
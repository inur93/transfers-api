import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JwtToken } from "../auth/jwtToken";
import { User } from "../users/user";
import crypto from 'crypto';

class Security {
    public getJwtSecret(): string {
        return process.env.JWT_SECRET || 'secret';
    }
    public createJwtToken({ _id, email, name, roles }: User, expiration: number = 0): JwtToken {
        const expiresIn = expiration || (60 * 60 * 1); // 1 hour
        const secret = this.getJwtSecret();
        const dataStoredInToken = {
            id: _id.toJSON(),
            email,
            name,
            roles
        };

        return {
            jwt: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }

    /**
     * Can be used to hash password or API key
     * @param value which is secret
     * @returns hash of the value
     */
    public async hash(value: string): Promise<string> {
        return await bcrypt.hash(value, 10);
    }

    public async getApiKeyPrefix(key: string): Promise<string> {
        const parts = key.split('.');
        if (parts.length != 2) return '';
        return parts[0];
    }

    public async generateApiKey(): Promise<string> {
        const prefix = await this.randomString(6);
        const key = await this.randomString(32);
        return `${prefix}.${key}`;
    }
    public async randomString(length: number, encoding: BufferEncoding = 'base64'): Promise<string> {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(length, (err, buff) => {
                if (err) reject(err);
                else resolve(buff.toString(encoding))
            })
        }
        )
    }

    public async comparePassword(password: string, hash: string): Promise<boolean> {
        return new Promise(function (resolve, reject) {
            bcrypt.compare(password, hash || '', function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }
}

export default new Security();
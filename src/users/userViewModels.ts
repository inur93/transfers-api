import { Role, User } from "./user";

/**
 * Object used when creating a new user
 * @example {
 *  "name": "John Doe",
 *  "email": "my@email.com",
 *  "roles": ["Everyone", "Admin"],
 *  "password": "my-superstrong-password"
 * }
 */
export interface CreateUser extends Pick<User, 'email' | 'name' | 'roles'> {
    password: string
}

/**
 * Object of this type is returned when retrieving a user or list of users
 * @example {
 *  "id": "617f0022093fae385642f6a1",
 *  "email": "johndoe@example.com",
 *  "name": "John Doe",
 *  "roles": ["Admin", "Everyone"]
 * }
 */
export interface GetUser {
    id: string;
    email: string;
    name: string;
    roles: Role[]
}
import { User } from './user';

export interface UserLogin {
    tokens: {
        access: {
            token : string,
            expires: string
        },
        refresh: {
            token: string,
            expires: string
        }
    },
    user: User
};

import {Injectable} from '@nestjs/common';
import {User} from '../interfaces';
import {Permissions} from '../constants/permissions';

@Injectable()
export class OldUsersService {

    readonly #users: User[];

    constructor() {
        this.#users = [{
            "id": 1,
            "username": "john",
            "password": "changeme",
            "permissions": ["ASSETS:CREATE", "ASSETS:READ"],
            "keyPair": {
                "publicKey": "GM5csu6hYhw6tsUpQVbNUVtijtbc41WCjVJCMeMebajj",
                "privateKey": "Fzr6s7KFAoSzRKsNfKdjjGD9aotL5hR9Zz1PfeteGeBj"
            }
        }, {
            "id": 2,
            "username": "chris",
            "password": "secret",
            "permissions": ["ASSETS:READ"],
            "keyPair": {
                "publicKey": "6936ShCznUWZfpLKrGia5sNdJQqC7hoAfQuG4MdLBLHJ",
                "privateKey": "EG64FJpgPPuCEN2UTY11FsxJ7vs9ScDVVPxTLEC5rEW4"
            }
        }, {
            "id": 3,
            "username": "maria",
            "password": "guess",
            "permissions": ["ASSETS:READ"],
            "keyPair": {
                "publicKey": "A8jVvETehg6NmdwVpo94xWeXw8jTxRKtWwjvsG6PpGVw",
                "privateKey": "69THj7zJbYrHTUHJ7h7j6gKHNGdeUcGRWiBJhe8Lu15N"
            }
        }];
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.#users.find(user => user.username === username);
    }

    getAllUsers(): User[] {
        return this.#users;
    }

}

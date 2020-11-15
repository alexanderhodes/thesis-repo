import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {

    async createHash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    compare(password: string, hashedPassword: string) {
        return bcrypt.compare(password, hashedPassword);
    }

}

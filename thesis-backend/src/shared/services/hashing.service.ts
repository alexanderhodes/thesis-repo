import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {

    async createHash(text: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(text, salt);
    }

    compare(clear: string, hashedText: string) {
        return bcrypt.compare(clear, hashedText);
    }

}

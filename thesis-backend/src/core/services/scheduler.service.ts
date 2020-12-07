import {Injectable, Logger} from '@nestjs/common';
import {Cron} from '@nestjs/schedule';

@Injectable()
export class SchedulerService {

    readonly #logger: Logger;

    constructor() {
        this.#logger = new Logger(SchedulerService.name);
    }

    @Cron('45 * * * * *')
    handleCron(): void {
        this.#logger.debug('called when second is 45', new Date().toDateString());
    }

}

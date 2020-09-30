import {Injectable, Logger} from "@nestjs/common";
import {Cron} from "@nestjs/schedule";

@Injectable()
export class TasksService {

    readonly #logger: Logger;

    constructor() {
        this.#logger = new Logger(TasksService.name);
    }

    @Cron('45 * * * * *')
    handleCron(): void {
        this.#logger.debug('called when second is 45', new Date().toDateString());
    }

}

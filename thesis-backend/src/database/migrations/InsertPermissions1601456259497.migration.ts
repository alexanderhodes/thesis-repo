import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertPermissions1601456259497Migration implements MigrationInterface  {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`insert into permission (name) values ('ASSETS:CREATE'), ('ASSETS:READ'), ('ASSETS:UPDATE'), ('ASSETS:DELETE'), ('ASSETS:SUGGEST')`);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`delete from permission`);
    }

}

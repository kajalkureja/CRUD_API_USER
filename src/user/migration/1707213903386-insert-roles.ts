import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertRoles1707213903386 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        insert into roles (name) values ('user');
        insert into roles (name) values ('moderator');
        insert into roles (name) values ('admin');
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

    
}

import { MigrationInterface, QueryRunner } from "typeorm"

export class createTodosTable1659141868030 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        create table tasks (
            id bigserial primary key,
            name text
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`drop table tasks;`)
    }

}
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRolesTable1707213819793 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        create table roles (
            id serial primary key,
            name text not null unique
        );        
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`drop table roles;`)
    }

}

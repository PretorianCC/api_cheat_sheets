import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUuidToUsers1669618104139 implements MigrationInterface {
    name = 'AddUuidToUsers1669618104139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "uuid"`);
    }

}

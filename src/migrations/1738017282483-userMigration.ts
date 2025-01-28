import { MigrationInterface, QueryRunner , Table } from "typeorm";


export class UserMigration1738017282483 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users", // نام جدول
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "500",
                    isNullable: false,
                },
                {
                    name: "lastName",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "mobile",
                    type: "int",
                    isNullable: false,
                    isUnique: true, // unique
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "email",
                    type: "varchar",
                    isNullable: false,
                    isUnique: true, // unique
                },
                {
                    name: "role",
                    type: "varchar",
                    isNullable: false,
                    default: "'user'", // default value
                },
                {
                    name:"token",
                    type:"varchar",
                    isNullable:true
                }
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users"); // نام جدول را اینجا مشخص کنید
    }

}

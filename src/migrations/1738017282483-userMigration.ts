import { MigrationInterface, QueryRunner , Table ,TableForeignKey } from "typeorm";


export class UserMigration1738017282483 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user", // نام جدول
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
                },
                {
                    name:"description",
                    type:'varchar',
                    isNullable:true
                },
                {
                    name:"education",
                    type:"varchar",
                    isNullable:false
                },
                {
                    name:"skills",
                    type:"json",
                    isNullable:false
                },
                {
                    name:"experience",
                    type:"varchar",
                    isNullable:true
                }
            ],
        }));

        // ایجاد جدول projects
        await queryRunner.createTable(new Table({
            name: 'project',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'projectName',
                    type: 'varchar',
                },
                {
                    name: 'userId', // این فیلد برای ارتباط با جدول users است
                    type: 'int',
                },
            ],
        }), true);
        await queryRunner.query(`SET FOREIGN_KEY_CHECKS = 0;`); // غیرفعال کردن چک‌های کلید خارجی
        await queryRunner.query(`ALTER TABLE project DROP FOREIGN KEY FK_userId;`); // حذف کلید خارجی با نام داینامیک
        await queryRunner.query(`SET FOREIGN_KEY_CHECKS = 1;`); // فعال کردن چک‌های کلید خارجی

        // تغییر ویژگی‌های فیلد id
        await queryRunner.query(`ALTER TABLE user CHANGE COLUMN id id INT NOT NULL AUTO_INCREMENT`);

        // اضافه کردن کلید خارجی جدید
        await queryRunner.query(`ALTER TABLE project 
            ADD CONSTRAINT FK_userId 
            FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE`);
    }

    

    public async down(queryRunner: QueryRunner): Promise<void> {
        // حذف کلید خارجی
        const table = await queryRunner.getTable("project");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        await queryRunner.dropForeignKey("project", foreignKey);

        // حذف جداول
        await queryRunner.dropTable("user");
    }

}

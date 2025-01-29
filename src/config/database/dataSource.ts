import { UserEntity } from "../../users/user.entity";
import { DataSource } from "typeorm";
import configurations from "config/configurations";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST ,
    port: Number(process.env.DATABASE_PORT),
    username:process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    synchronize:false ,
    entities: [UserEntity],
    migrations: ["src/migrations/*.ts"],
});
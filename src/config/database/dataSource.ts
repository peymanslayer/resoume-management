import { User } from "../../users/user.entity";
import { DataSource } from "typeorm";
import configurations from "config/configurations";
import * as dotenv from 'dotenv';
import { ProjectEntity } from '../../projects/projects.entity';

dotenv.config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST ,
    port: Number(process.env.DATABASE_PORT),
    username:process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    synchronize:false ,
    entities: [User,ProjectEntity],
    migrations: ["src/migrations/*.ts"],
});
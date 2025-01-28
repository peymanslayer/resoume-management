import { UserEntity } from "../../users/user.entity";
import { DataSource } from "typeorm";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Peyman1378P$",
    database: "resoume",
    synchronize:false ,
    entities: [UserEntity],
    migrations: ["src/migrations/*.ts"],
});
import type { DataSourceOptions } from "typeorm";
import type { SeederOptions } from "typeorm-extension";
import { User } from "../entities/user.entity";
import { Post } from "../entities/post.entity";
import { seederOptions } from "./seeder.options";
import { env } from "../env";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = env;
export const options: DataSourceOptions & SeederOptions = {
  // type: "mysql", // NOTE works for both
  type: "postgres",
  host: DB_HOST || "localhost",
  port: Number(DB_PORT) || 3306,
  username: DB_USER || "test",
  password: DB_PASSWORD || "test",
  database: DB_NAME || "test",
  entities: [User, Post],
  ...seederOptions,
};

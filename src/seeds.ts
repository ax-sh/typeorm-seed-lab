import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";

import { MainSeeder } from "./main.seeder";

import { User } from "./user.entity";
import { Post } from "./post.entity";
import { UsersFactory } from "./users.factory";
import { PostsFactory } from "./post.factory";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const options: DataSourceOptions & SeederOptions = {
  type: "mysql",
  host: DB_HOST || "localhost",
  port: Number(DB_PORT) || 3306,
  username: DB_USER || "test",
  password: DB_PASSWORD || "test",
  database: DB_NAME || "test",
  entities: [User, Post],
  // additional config options brought by typeorm-extension
  factories: [UsersFactory, PostsFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});

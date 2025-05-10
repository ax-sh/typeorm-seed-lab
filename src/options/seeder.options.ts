import type { SeederOptions } from "typeorm-extension";
import { UsersFactory } from "../factories/users.factory.ts";
import { PostsFactory } from "../factories/post.factory.ts";
import { MainSeeder } from "../main.seeder.ts";

export const seederOptions: SeederOptions = {
  // additional config options from SeederOptions( typeorm-extension)
  factories: [UsersFactory, PostsFactory],
  seeds: [MainSeeder],
};

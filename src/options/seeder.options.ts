import type { SeederOptions } from "typeorm-extension";
import { UsersFactory } from "../factories/users.factory";
import { PostsFactory } from "../factories/post.factory";
import { MainSeeder } from "../main.seeder";

export const seederOptions: SeederOptions = {
  // additional config options from SeederOptions( typeorm-extension)
  factories: [UsersFactory, PostsFactory],
  seeds: [MainSeeder],
};

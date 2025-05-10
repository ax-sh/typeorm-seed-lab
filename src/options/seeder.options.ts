import type { SeederOptions } from "typeorm-extension";
import { PostsFactory } from "../factories/post.factory";
import { UsersFactory } from "../factories/users.factory";
import { MainSeeder } from "../main.seeder";

export const seederOptions: SeederOptions = {
  // additional config options from SeederOptions( typeorm-extension)
  factories: [UsersFactory, PostsFactory],
  seeds: [MainSeeder],
};

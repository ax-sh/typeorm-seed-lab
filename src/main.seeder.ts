import type { DataSource } from "typeorm";
import type { Seeder, SeederFactoryManager } from "typeorm-extension";

import { faker } from "@faker-js/faker";
import { Post } from "./entities/post.entity";
import { User } from "./entities/user.entity";

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const postsRepository = dataSource.getRepository(Post);

    const userFactory = factoryManager.get(User);
    const postsFactory = factoryManager.get(Post);

    const USER_COUNT = 7;
    const POST_COUNT = 17;

    const users = await userFactory.saveMany(USER_COUNT);

    const posts = await Promise.all(
      Array(POST_COUNT)
        .fill("")
        .map(async () => {
          const made = await postsFactory.make({
            author: faker.helpers.arrayElement(users),
          });
          return made;
        }),
    );
    await postsRepository.save(posts);
  }
}

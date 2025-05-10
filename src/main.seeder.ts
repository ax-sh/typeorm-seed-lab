import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { Post } from "./entities/post.entity";
import { User } from "./entities/user.entity";
import { faker } from "@faker-js/faker";

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
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

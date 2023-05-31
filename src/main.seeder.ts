import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
// import { faker } "@faker-js/faker";

import { Post } from "./entities/post.entity";
import { User } from "./entities/user.entity";
import { faker } from "@faker-js/faker";

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const postsRepository = dataSource.getRepository(Post);

    const userFactory = factoryManager.get(User);
    const postsFactory = factoryManager.get(Post);

    const users = await userFactory.saveMany(7);

    const posts = await Promise.all(
      Array(17)
        .fill("")
        .map(async () => {
          const made = await postsFactory.make({
            author: faker.helpers.arrayElement(users),
          });
          return made;
        })
    );
    await postsRepository.save(posts);
  }
}

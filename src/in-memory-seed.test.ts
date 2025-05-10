import { beforeAll, describe, expect, it } from "bun:test";
import { type IMemoryDb, newDb } from "pg-mem";

import type { DataSource } from "typeorm";

import { User } from "./entities/user.entity";
import { runSeeders } from "typeorm-extension";
import { createInMemoryTypeormDataSource } from "./create-in-memory-typeorm-data-source";
import { Post } from "./entities/post.entity";

describe("sql seed test", () => {
  let db: IMemoryDb;
  let dataSource: DataSource;

  beforeAll(async () => {
    //==== create a memory db
    db = newDb({
      // 👉 Recommended when using Typeorm .synchronize(), which creates foreign keys but not indices !
      autoCreateForeignKeyIndices: true,
    });

    dataSource = createInMemoryTypeormDataSource(db);

    await dataSource.initialize();
    await dataSource.synchronize();
  });
  it("should count initial users", async () => {
    const countUsers = await dataSource.getRepository(User).count();

    expect(countUsers).toBe(0);
  });

  it("should ", async () => {
    await runSeeders(dataSource);
    const userRepo = dataSource.getRepository(User);
    const postRepo = dataSource.getRepository(Post);
    const users = await userRepo.find();
    expect(users).toHaveLength(7);
    const posts = await postRepo.find();
    // console.table(posts)
    console.table(users);
    // destroy on each test end
    // await dataSource.destroy()
  });
});

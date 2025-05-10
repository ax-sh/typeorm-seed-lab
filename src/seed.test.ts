import { type IMemoryDb, newDb } from "pg-mem";
import type { DataSource } from "typeorm";

import { User } from "./entities/user.entity";

import { runSeeders } from "typeorm-extension";
import { createTypeormDataSource } from "./create-typeorm-datasource";
import { beforeAll, describe, expect, it } from "bun:test";

describe("sql seed test", () => {
  let db: IMemoryDb;
  let dataSource: DataSource;

  beforeAll(async () => {
    //==== create a memory db
    db = newDb({
      // 👉 Recommended when using Typeorm .synchronize(), which creates foreign keys but not indices !
      autoCreateForeignKeyIndices: true,
    });

    dataSource = createTypeormDataSource(db);

    await dataSource.initialize();
    await dataSource.synchronize();
  });
  it("should count initial users", async () => {
    const countUsers = await dataSource.getRepository(User).count();

    expect(countUsers).toBe(0);
  });

  it("should ", async () => {
    await runSeeders(dataSource);
    const repo = dataSource.getRepository(User);
    const users = await repo.find();
    expect(users).toHaveLength(7);
    console.table(users);
    // destroy on each test end
    // await dataSource.destroy()
  });
});

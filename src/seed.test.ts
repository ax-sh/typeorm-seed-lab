import { type IMemoryDb, newDb } from "pg-mem";
import type { DataSource } from "typeorm";

import { User } from "./entities/user.entity.ts";
import { createTypeormDataSource } from "./create-typeorm-datasource.ts";
import {runSeeders} from "typeorm-extension";

describe("sql seed test", () => {
  let db: IMemoryDb;
  let dataSource: DataSource;

  beforeAll(async () => {
    //==== create a memory db
    const db = newDb({
      // 👉 Recommended when using Typeorm .synchronize(), which creates foreign keys but not indices !
      autoCreateForeignKeyIndices: true,
    });

    dataSource = createTypeormDataSource(db);

    await dataSource.initialize();
    await dataSource.synchronize();
  });
  it("should test something", async () => {
    const tag = await dataSource.getRepository(User).count();
    console.log(tag);
    // expect(tag.slug).toBe('any_tag')
  });
  it("should ", async () => {
    // await dataSource.initialize()
    // await dataSource.synchronize()
    await runSeeders(dataSource);
    const users = await dataSource.getRepository(User).find();
    console.log(users)
    // console.log(db)
    // const got = createTypeormDataSource();
    // console.log(got.synchronize())
    // try {
    //   //==== create tables
    //   await got.synchronize();
    //   const users = got.getRepository(User);
    //   console.log(users);
    // } finally {
    //   // do not forget to close the connection once done...
    //   // ... typeorm stores connections in a static object,
    //   // and does not like opening 'default connections.
    //   await got.destroy();
    // }
    // console.log(got);
    //     db.public.none(`create table test(id text); insert into test values ('value');`);
    //     const result = db.public.many(`select * from test`); // => {test: 'value'}
    //     console.table(result);
    //     //     // Basic insert with direct values
    //     //     const result = await sql`
    //     //   SELECT 1;
    //     //   SELECT 2;
    //     // `.simple();
    //     //     console.log(2,33)
    //     //     expect(1).toBe(1)
  });
});

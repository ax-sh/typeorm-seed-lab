import { DataType, type IMemoryDb } from "pg-mem";
import type { DataSourceOptions } from "typeorm";
import type { SeederOptions } from "typeorm-extension";
import { Post } from "./entities/post.entity";
import { User } from "./entities/user.entity";
import { seederOptions } from "./options/seeder.options";

export function createInMemoryTypeormDataSource(db: IMemoryDb) {
  db.public.registerFunction({
    name: "current_database",
    args: [],
    returns: DataType.text,
    implementation: (x) => `hello world: ${x}`,
  });

  db.public.registerFunction({
    name: "version",
    args: [],
    returns: DataType.text,
    implementation: (x) => `hello world: ${x}`,
  });

  // db.registerExtension('uuid-ossp', (schema) => {
  //   schema.registerFunction({
  //     name: 'uuid_generate_v4',
  //     returns: DataType.uuid,
  //     implementation: v4,
  //     impure: true
  //   })
  // })
  const options: SeederOptions & DataSourceOptions = {
    type: "postgres",
    entities: [User, Post],
    ...seederOptions,
  };
  return db.adapters.createTypeormDataSource(options);
}

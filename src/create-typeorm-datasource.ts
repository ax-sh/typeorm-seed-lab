import { DataType, type IMemoryDb } from "pg-mem";
import { User } from "./entities/user.entity.ts";
import { Post } from "./entities/post.entity.ts";

export function createTypeormDataSource(db: IMemoryDb) {
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
  return db.adapters.createTypeormDataSource({
    type: "postgres",
    entities: [User, Post],
  });
}

import "reflect-metadata";
import { DataSource } from "typeorm";
import { runSeeders } from "typeorm-extension";
import { env } from "./env";
import { options } from "./options/datasource.options";

const CONFIRM_SEEDING = !false;

console.info("using these environment for seeding the database", env);
console.warn(
  "NOTE THE SEEDING PROCESS MAY WIPE YOUR DATABASE TABLES, USE WITH CAUTION.",
);

if (!CONFIRM_SEEDING) {
  console.warn("SEEDING IS DISABLED");
  process.exit();
}

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});

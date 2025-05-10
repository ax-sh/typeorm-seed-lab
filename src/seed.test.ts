import { newDb } from "pg-mem";

import { sql } from "bun";
// import { expect, test } from "vitest";
export function sum(a, b) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

describe("sql seed test", () => {
  it("should ", async () => {
    const db = newDb();
    db.public.none(`create table test(id text); insert into test values ('value');`);
    const result = db.public.many(`select * from test`); // => {test: 'value'}
    console.table(result);
    //     // Basic insert with direct values
    //     const result = await sql`
    //   SELECT 1;
    //   SELECT 2;
    // `.simple();
    //     console.log(2,33)
    //     expect(1).toBe(1)
  });
});

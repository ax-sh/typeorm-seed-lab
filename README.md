# Exploration: Automating TypeORM Schema, Seeding & In-Memory Testing

- **TypeORM as the ORM.**
- **Seeding as the core functionality (using typeorm-extension-seed,
  Faker.js).**
- **In-memory testing of this seeding logic (a key feature using pg-mem).**
- **Robust environment setup and configuration (dotenv, zod).**
- **The overall goal of automating and improving the reliability of these
  development workflows.**

#### **This repo contains scripts to seed an SQL database using Typeorm and is a showcase of implemented concepts and not a distributable tool.**

---

**Exploration into automating database setup tasks for Node.js applications. The
focus was on understanding how to streamline schema generation, data seeding,
and testing processes to reduce manual effort, enhance data robustness, and
improve developer experience.**

## Key Areas of Exploration & Implementation

1. **Automated, Database-Agnostic Schema Generation:** Investigated using CLI
   tools like `typeorm-model-generator` to introspect live SQL databases
   (PostgreSQL, MySQL, etc.) and automatically generate TypeORM-compatible
   entity files (`.ts`). This keeps application entities synchronized with the
   database structure with minimal manual intervention. (Example using
   `typeorm-model-generator`:
   https://github.com/Kononnable/typeorm-model-generator)

   ### You can use the below code for generating typeorm entities from already existing database connection

   ```sh
   npx typeorm-model-generator -h <host> -d <database_name> -e <engine: mysql|postgres> -u <username> -x <password> --ssl
   ```

2. **Automated Data Seeding:** Leverages the generated TypeORM schemas and
   Faker.js to populate your database with realistic data, tightly coupled with
   your actual schema.
3. **High-Speed, In-Memory Testing:** Integrates with `pg-mem` (for PostgreSQL)
   to enable rapid, dependency-free testing of data integrity and seeding logic
   without needing an external database instance. and bun as testing framework

This project automates significant manual effort, reduces technical debt, and
enhances data robustness throughout the development lifecycle.

## Technology Stack

- **Primary Language:** TypeScript
- **Runtime Environment:** Bun
- **ORM:** TypeORM
- **In-Memory Testing**: Pg-mem, Bun

## Skills Demonstrated

This exploration involved and demonstrated skills in:

Automating complex developer workflows.

- **Database Schema Introspection & Code Generation:** Building tools that can
  understand database structures and generate corresponding application code.
- **Advanced TypeORM Usage:** Leveraging TypeORM not just for CRUD, but for
  schema management and integration with dynamic data generation.
- **CLI Tool Development:** Creating effective command-line interfaces for
  developer tools.
- **Database-Agnostic Design:** Architecting solutions that can operate across
  different database systems.
- **In-Memory Testing Strategies:** Implementing efficient testing solutions
  that reduce external dependencies and speed up feedback loops (e.g., using
  `pg-mem`).
- **Problem-Solving for Developer Productivity:** Identifying key pain points in
  the development lifecycle and building targeted solutions. Developing
  command-line utilities.
- **Experimentation with Runtimes:** Explored using Bun alongside Node.js.

## Key Learnings & Outcomes

This exploration highlighted practical approaches to:

development or testing database ready. databases are populated reliably.

- **Reducing Manual Work & Errors:** By automating repetitive tasks in schema
  management and data seeding.
- **Improving the Developer Experience:** By simplifying complex
  database-related workflows.

### Environment, Configuration, and Reliability Strategies

This project incorporates several strategies to manage its environment, ensure
configuration consistency, and enhance the overall reliability of the
development and testing processes:

1. **Environment Variable Management:**
   - **Loading:** Environment variables are loaded from a `.env` file (e.g.,
     `<Project root>/.env`) using the `dotenv` library. The path to the `.env`
     file is resolved using `app-root-path` to ensure it's found correctly
     regardless of the execution context, as demonstrated in `env.ts`.
   - **Validation:** `zod` is employed for robust schema definition and
     validation of these environment variables. This crucial step ensures that
     all required variables (defined in files like `.env.example`) are present
     and correctly formatted before the application or any scripts proceed. If
     validation fails, the process exits with an informative error, preventing
     runtime issues that could arise from misconfiguration.
   - **Safe Loading (Optional):** The setup includes an option (controlled by
     the `USE_SAFE_DOTENV` flag in `src/env.ts`) to use `dotenv-safe`. When
     enabled, this would enforce the presence of all variables defined in an
     `.env.example` file, further minimizing configuration errors.

2. **Ensuring Consistency and Reliability:**
   - **Schema-Driven Development:** TypeORM entities (e.g.,
     `src/entities/user.entity.ts`, `src/entities/post.entity.ts`) act as the
     canonical source of truth for the database schema. This ensures a tight
     coupling and consistency between the application's code and the actual
     database structure.
   - **Automated & Typed Seeding:** The `typeorm-extension` library, combined
     with custom seeders (like `src/main.seeder.ts`) and data factories (found
     in `src/factories/`), automates the process of populating the database. The
     use of TypeScript throughout this process provides strong type safety,
     catching potential issues at compile time.
   - **Centralized Configuration:** Key configurations, such as database
     connection details (`src/options/datasource.options.ts`) and seeder options
     (`src/options/seeder.options.ts`), are managed in centralized locations.
     This simplifies updates, promotes consistency, and reduces the chances of
     disparate configurations.
   - **Realistic Test Data Generation:** Faker.js is integrated within the data
     factories to generate diverse and realistic-looking data. This not only
     aids in thorough testing but also helps in creating development
     environments that more closely mirror production scenarios.

3. **Promoting Feasibility and Decreasing Errors:**
   - **Automation of Repetitive Tasks:** A core principle is the automation of
     otherwise manual and error-prone tasks like schema management (as explored
     with `typeorm-model-generator`), data seeding, and test environment setup.
     This significantly boosts feasibility for complex setups and drastically
     reduces human error.
   - **Rapid In-Memory Testing:** The integration of `pg-mem` for in-memory
     database testing (showcased in `src/in-memory-seed.test.ts`) is a key
     enabler for feasibility. It allows for fast, isolated, and dependency-free
     testing of seeding logic, entity relationships, and data integrity. This
     accelerates development cycles by providing quick feedback without the
     overhead of managing external database instances for tests.
   - **Explicit Safeguards:** The main seeding script (`src/seeds.ts`)
     incorporates an explicit `CONFIRM_SEEDING` flag and prominent warnings.
     This acts as a critical safeguard to prevent accidental data loss,
     especially when operating against development databases that might contain
     valuable data.
   - **Early Error Detection & Prevention:** The combination of TypeScript's
     static type checking, `zod`'s environment variable validation at startup,
     and automated tests ensures that many potential errors are caught early in
     the development lifecycle, long before they can impact later stages or
     production.

# NEVER RUN ON PROD DATABASE

# USE IN CAUTION WHEN IN DEV DATABASE

## How to Run

This project uses `bun` as its runtime and package manager.

### 1. Running In-Memory Tests

The in-memory tests provide a safe and fast way to verify the seeding logic
without connecting to an actual database.

- **Safety:** These tests use `pg-mem` to simulate a PostgreSQL environment
  entirely in memory. They do not require any external database connection and
  will not affect any existing database can be run without setting up env.
- **Command:**
  ```bash
  bun test
  ```
  This will execute the test files, such as `src/in-memory-seed.test.ts`.

### 2. Running the Database Seeding Script

The database seeding script populates an actual database (PostgreSQL or MySQL,
as configured) with data.

- **Prerequisites:**
  1. **Configure Environment Variables:** Copy the `.env.example` file to `.env`
     (both in the project root) and fill in your actual database connection
     details. The script `src/env.ts` uses `zod` to validate these variables; if
     they are missing or incorrect, the script will exit with an error.
  2. **Database Server:** Ensure your database server (e.g., PostgreSQL, MySQL)
     is running and accessible with the credentials provided in your `.env`
     file.
- **Safety & Execution:**
  - The script `src/seeds.ts` includes a `CONFIRM_SEEDING` flag. By default,
    this is set to `!false` (which evaluates to `true`), meaning the seeding
    process is enabled. If you wish to prevent execution, you can manually
    change this flag to `false` in the script.
  - **Important:** The script uses `dataSource.synchronize(true)`. This command
    will attempt to synchronize your database schema with the TypeORM entities.
    **This can be a destructive operation, potentially dropping tables and data
    if the schema has changed.** Always be cautious, especially with development
    databases that might contain important data.
  - If the environment variables are not correctly set up, the validation in
    `src/env.ts` will prevent the script from proceeding.

# Caution when using the script with enabled `CONFIRM_SEEDING` flag with valid database connection, it will wipe tables before recreating it with seed data

1. set CONFIRM_SEEDING to true
2. Run

**Command:**

```bash
bun run /src/seeds.ts
```

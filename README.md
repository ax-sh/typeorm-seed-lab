# Exploration: Automating TypeORM Schema, Seeding & In-Memory Testing

**This is a showcase of implemented concepts and not a distributable tool.**

This repository documents a personal exploration into automating database setup tasks for Node.js applications. The focus was on understanding how to streamline schema generation, data seeding, and testing processes to reduce manual effort, enhance data robustness, and improve developer experience. 

## Key Areas of Exploration & Implementation

1. **Automated, Database-Agnostic Schema Generation:**
    Investigated using CLI tools like `typeorm-model-generator` to introspect live SQL databases (PostgreSQL, MySQL, etc.) and automatically generate TypeORM-compatible entity files (`.ts`). This keeps application entities synchronized with the database structure with minimal manual intervention.
    (Example using `typeorm-model-generator`: https://github.com/Kononnable/typeorm-model-generator)

```sh
npx typeorm-model-generator -h <host> -d <database_name> -e <engine: mysql|postgres> -u <username> -x <password> --ssl
```

4. **Automated Data Seeding:** Leverages the generated TypeORM schemas and
   Faker.js to populate your database with realistic data, tightly coupled with
   your actual schema.
5. **High-Speed, In-Memory Testing:** Integrates with `pg-mem` (for PostgreSQL)
   to enable rapid, dependency-free testing of data integrity and seeding logic
   without needing an external database instance.

This project automates significant manual effort, reduces technical debt, and
enhances data robustness throughout the development lifecycle.

## Technology Stack

- **Primary Language:** TypeScript
- **Runtime Environment:** Bun
- **ORM:** TypeORM
- **In-Memory Testing**: Pg-mem 

## Skills Demonstrated

This exploration involved and demonstrated skills in:

  complex developer workflows.
- **Database Schema Introspection & Code Generation:** Building tools that can
  understand database structures and generate corresponding application code.
- **Advanced TypeORM Usage:** Leveraging TypeORM not just for CRUD, but for
  schema management and integration with dynamic data generation.
- **CLI Tool Development:** Creating effective command-line interfaces for
  developer tools.
- **Database-Agnostic Design:** Architecting solutions that can operate across
  different database systems.
- **In-Memory Testing Strategies:** Implementing efficient testing solutions
  that reduce external dependencies and accelerate feedback loops (e.g., using `pg-mem`).
- **Problem Solving for Developer Productivity:** Identifying key pain points in
  the development lifecycle and building targeted solutions.
  utilities.
- **Experimentation with Runtimes:** Explored using Bun alongside Node.js.

## Key Learnings & Outcomes

This exploration highlighted practical approaches to:

  development or testing database ready.
  are populated reliably.
- **Reducing Manual Work & Errors:** By automating repetitive tasks in schema management and data seeding.
- **Improving the Developer Experience:** By simplifying complex database-related workflows.

# NEVER RUN ON PROD DATABASE
# USE IN CAUTION WHEN IN DEV DATABASE

## This repo contains scripts to seed SQL database using Typeorm

### You can use the below code for generating Typeform entities from an already existing database
# Caution when using the script it will delete all tables before recreating it when using the seeding

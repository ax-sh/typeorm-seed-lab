# typeorm-seed-2023

## This repo contains scripts to seed SQL database using Typeorm


### You can use the below code for generating Typeform entities from an already existing database

```sh


npx typeorm-model-generator -h <host> -d <database_name> -e <engine: mysql|postgres> -u <username> -x <password> --ssl


```
Caution when using the script it will delete all tables before recreating it when running seeding

[https://github.com/Kononnable/typeorm-model-generator](https://github.com/Kononnable/typeorm-model-generator)

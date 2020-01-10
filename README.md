## Scooter typescript app

## Tech jump project


Run projects:
`npm run lerna -- run start:dev --scope @rent/rent-app`

`npm run lerna -- run start:dev --scope @rent/server` / `npm run lerna -- run start:dev --scope @rent/server --stream`

Database migration:
1. `npx lerna exec --scope @rent/server --stream -- npm run typeorm -- migration:generate -n migrationName`
2. Move `migrationName` generated file to the `migration` directory 
3. `npx lerna exec --scope @rent/server --stream -- npm run typeorm -- migration:run`

module.exports = {
   "type": "sqlite",
   "database": "database.sqlite",
   "synchronize": true,
   "logging": ["error", "warn", "schema"],
   "entities": [
      "../db/src/entity/**/*.ts"
   ],
   "migrations": [
      "../db/src/migration/**/*.ts"
   ],
   "subscribers": [
      "../db/src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "./packages/db/src/entity",
      "migrationsDir": "./packages/db/src/migration",
      "subscribersDir": "./packages/db/src/subscriber"
   }
}

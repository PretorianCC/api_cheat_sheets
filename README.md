**Миграции**

```TypeScript
// ormdatasource.ts
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'server',
  port: 5432,
  username: 'user',
  password: '********',
  database: 'database',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
});
```

```json
"typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js -d src/ormdatasource.ts",
"db:drop": "npm run typeorm schema:drop",
"db:create": "npm run typeorm migration:generate",
"db:migrate": "npm run typeorm migration:run"
```

```bash
npm run db:create src/migrations/CreateTags
npm run db:migrate
```

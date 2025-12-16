import { defineConfig } from 'drizzle-kit';
//import 'dotenv/config';

export default defineConfig({
  schema: './src/models',
  out: './drizzle/migrations',
  dialect: 'postgresql',             // 必須指定 dialect
  // @ts-ignore
  url: 'postgresql://neondb_owner:xxxxx@ep-flat-boat-a1l14p5s-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
});


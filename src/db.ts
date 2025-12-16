  // @ts-ignore
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
//import 'dotenv/config';

export const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_KaQ37WjpLHnY@ep-flat-boat-a1l14p5s-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false }, // Neon 必須
});

// 建立 Drizzle ORM 實例
export const db = drizzle(pool);

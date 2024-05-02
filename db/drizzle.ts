import { neon } from "@neondatabase/serverless"
import * as schema from "./schema"
import { drizzle } from "drizzle-orm/neon-http";
const sql = neon(process.env.DATABASE_URL!);
//@ts-ignore
const db = drizzle(sql, { schema })

export default db;
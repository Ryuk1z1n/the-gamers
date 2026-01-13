import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

//configurar pool de conexões
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

//Função para fechar conexão
export async function closeConnection() {
  await pool.end();
}

export default db;

import type { Tables } from "../../types";
import { db } from "../data/db";

async function create(
  table: Tables,
  newOne: Record<string, any>
): Promise<void> {
  try {
    const fields = Object.keys(newOne);
    const placeholders = fields.map(() => "?").join(",");
    const values = fields.map((field) => newOne[field]);
    const query = db.prepare(
      `INSERT INTO ${table} (${fields.join(",")}) VALUES (${placeholders})`
    );
    query.run(...values);
    query.finalize();
  } catch (error) {
    console.log(error);
  }
}

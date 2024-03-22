import type { Tables } from "../../types";
import { db } from "../data/db";

export async function create(
  table: Tables,
  newOne: Record<string, any>
): Promise<Response> {
  try {
    const fields = Object.keys(newOne);
    console.log("🚀 ~ fields:", fields);
    const placeholders = fields.map(() => "?").join(",");
    const values = fields.map((field) => newOne[field]);
    console.log("🚀 ~ values:", values);
    const query = db.prepare(
      `INSERT INTO ${table} (${fields.join(",")}) VALUES (${placeholders})`
    );
    query.run(...values);
    query.finalize();
    return new Response("Entry has been created", {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Error creating entry", {
      status: 500,
    });
  }
}

async function read(table: Tables, id: string[]): Promise<Response> {
  try {
    const placeholder = id.map(() => "?").join(",");
    const query = db.prepare(
      `SELECT * FROM ${table} WHERE id = ${placeholder}`
    );
    const result = query.all();
    query.finalize();
    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Errors have been made", {
      status: 500,
    });
  }
}

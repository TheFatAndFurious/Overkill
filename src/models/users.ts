import type { User } from "../../types";
import { db } from "../data/db";

async function createUser(user: User): Promise<void> {
  const { username, password, email, first_name, last_name } = user;
  const query = db.prepare(
    "INSERT INTO users (username, password, email, first_name, last_name) VALUES (?,?,?,?,?)"
  );
  query.run(username, password, email, first_name, last_name);
  query.finalize();
}

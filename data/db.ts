import { Database } from "bun:sqlite";

const dbPath = process.env.DATABASE_PATH;
const db = new Database(dbPath, { create: true });

export async function dbInit(): Promise<void> {
  try {
    db.run(
      "CREATE TABLE IF NOT EXISTS roles(role_id INTEGER PRIMARY KEY AUTOINCREMENT, role_name TEXT UNIQUE)"
    );

    db.run(
      "CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, first_name TEXT NOT NULL, last_name TEXT NOT NULL, password TEXT NOT NULL, email TEXT NOT NULL UNIQUE, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, role_id INTEGER, FOREIGN KEY(role_id) REFERENCES roles(role_id))"
    );

    db.run(
      "CREATE TABLE IF NOT EXISTS articles(article_id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT NOT NULL, content TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, is_published BOOLEAN DEFAULT FALSE)"
    );

    db.run(
      "CREATE TABLE IF NOT EXISTS tags(tag_id INTEGER PRIMARY KEY AUTOINCREMENT, tag_name TEXT NOT NULL UNIQUE)"
    );

    db.run(
      "CREATE TABLE IF NOT EXISTS articles_tags(article_id INTEGER, tag_id INTEGER, FOREIGN KEY(article_id) REFERENCES articles(article_id), FOREIGN KEY(tag_id) REFERENCES tags(tag_id))"
    );

    db.run(
      "CREATE TABLE IF NOT EXISTS articles_authors(article_id INTEGER, author_id INTEGER, FOREIGN KEY(article_id) REFERENCES articles(article_id), FOREIGN KEY(author_id) REFERENCES users(user_id))"
    );

    db.close();
  } catch (error) {
    return console.log(error);
  }
  console.log("DB was successfully initialized in ", dbPath);
}

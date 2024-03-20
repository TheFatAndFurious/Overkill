import type { Article } from "../../types";
import { db } from "../data/db";

async function createArticle(article: Article): Promise<void> {
  try {
    const { title, description, content } = article;
    const query = db.prepare(
      "INSERT INTO articles (title, description, content) VALUES (?, ?, ?)"
    );
    query.run(title, description, content);
    query.finalize();
  } catch (error) {
    console.log(error);
  }
}

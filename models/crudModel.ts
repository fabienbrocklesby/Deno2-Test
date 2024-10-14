import { db } from "../db.ts";

export interface CrudItem {
  id: string;
  title: string;
  body: string;
  author: string;
  published: Date;
}

export const CrudModel = {
  create(item: Omit<CrudItem, 'id'>): string {
    const id = crypto.randomUUID();
    db.query(
      "INSERT INTO crud (id, title, body, author, published) VALUES (?, ?, ?, ?, ?)",
      [id, item.title, item.body, item.author, item.published.toISOString()]
    );
    return id;
  },

  readAll(): CrudItem[] | null {
    const result = db.query<[number, string, string, string, string]>("SELECT * FROM crud");
    if (result) {
      return result.map(([id, title, body, author, published]) => ({
        id: id.toString(),
        title,
        body,
        author,
        published: new Date(published),
      }));
    }
    return null;
  },

  read(id: number): CrudItem | null {
    const result = db.query<[number, string, string, string, string]>(
      "SELECT * FROM crud WHERE id = ?",
      [id]
    );
    if (result && result.length > 0) {
      const [id, title, body, author, published] = result[0];
      return { id: id.toString(), title, body, author, published: new Date(published) };
    }
    return null;
  },

  update(id: number, item: Partial<Omit<CrudItem, 'id'>>): boolean {
    const current = this.read(id);
    if (!current) return false;

    const updatedItem = { ...current, ...item };
    db.query(
      "UPDATE crud SET title = ?, body = ?, author = ?, published = ? WHERE id = ?",
      [updatedItem.title, updatedItem.body, updatedItem.author, updatedItem.published.toISOString(), id]
    );
    return true;
  },

  delete(id: string): boolean {
    const result = db.query("DELETE FROM crud WHERE id = ?", [id]);
    return result.length > 0;
  },
};
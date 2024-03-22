export type User = {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  role?: string;
};

export type Article = {
  title: string;
  description: string;
  content: string;
  is_published?: boolean;
};

export type Tag = {
  tag_name: string;
};

export type Role = {
  role_name: string;
};

export enum Tables {
  Users = "users",
  Articles = "articles",
  Tags = "tags",
  Roles = "roles",
  Articles_Tags = "articles_tags",
  Articles_Authors = "articles_authors",
}

export type DatabaseEntity = User | Article | Tag | Role;

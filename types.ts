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

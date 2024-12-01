export interface User {
  books: string[];
  _id: string;
  email: string;
  password: string;
  created_at: string;
  updatedAt: string;
  __v: number;
}

export interface UserForAuth {
  id: string;
  email: string;
  password: string;
  accessToken: string;
}

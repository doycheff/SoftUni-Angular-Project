import { User } from './user';

export interface Book {
  _id: string;
  _ownerId: string;
  title: string;
  genre: string;
  price: string;
  description: string;
  image: string;
  userId: User;
  created_at: string;
  updatedAt: string;
  __v: number;
}

export class Book {
  id: number;
  userId: number;
  title: string;
  author: string;
  pages: number;
  genre: string;
  comments: Comment[];
}

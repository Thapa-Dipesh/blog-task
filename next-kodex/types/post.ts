export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  authorId?: string;
  author?: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  tags?: string[];
}

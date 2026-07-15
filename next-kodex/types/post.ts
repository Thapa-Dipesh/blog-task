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
  keywords?: string;
  authorId?: string;
  metaTitle?: string;
  metaDescription?: string;
  author?: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  tags?: string[];
}

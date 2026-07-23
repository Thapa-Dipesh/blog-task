import { CreatePostForm } from "@/components/site/blog/create-post-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Post | KODEX.",
};

export default function NewPostPage() {
  return <CreatePostForm />;
}

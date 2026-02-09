import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface ApiResponse {
  posts: Post[];
}

interface Post {
  id: number;
  title: string;
  description: string;
  slug: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string | null;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
  };
}

export const postApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => ({
        url: "/api/post/posts",
        method: "GET",
      }),
      transformResponse: (response: ApiResponse) => response.posts,
      providesTags: ["Posts"],
    }),
    getUserPosts: builder.query<Post[], void>({
      query: () => ({
        url: "/api/post/my-posts",
        method: "GET",
      }),
      transformResponse: (response: ApiResponse) => response.posts,
      providesTags: ["Posts"],
    }),
    getPostById: builder.query<Post, string>({
      query: (id) => ({
        url: `/api/post/posts/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { post: Post } | Post) => {
        return "post" in response ? response.post : response;
      },
    }),
    createPost: builder.mutation({
      query: (postData) => ({
        url: "/api/post/create",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/api/post/posts/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/api/post/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetPostByIdQuery,
  useGetPostsQuery,
  useGetUserPostsQuery,
} = postApi;

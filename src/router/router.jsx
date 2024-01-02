import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import PostListPage from "../pages/Post.List";
import PostDetailPage from "../pages/Post.detail";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/posts", element: <PostListPage /> },
  { path: "/post-detail/:postId", element: <PostDetailPage /> },
]);

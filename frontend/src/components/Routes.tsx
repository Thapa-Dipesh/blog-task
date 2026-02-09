import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "../Layout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import CreatePost from "../pages/CreatePost";
import AllBlogs from "../pages/AllBlogs";
import SinglePost from "../pages/SinglePost";
import ProtectedRoute from "./ProtectedRoute";
import RegisterUser from "../pages/RegisterUser";
import EditBlog from "../pages/EditBlog";

const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />} />
        <Route path="/signup" element={<RegisterUser />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/post/:id" element={<SinglePost />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/create" element={<CreatePost />} />
          <Route path="/my-blogs" element={<AllBlogs />} />
          <Route path="/edit/:id" element={<EditBlog />} />
        </Route>
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default Routes;

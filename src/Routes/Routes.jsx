import { createBrowserRouter } from "react-router-dom";
import App from "../Layout/App";

import AddBlog from "../Pages/AddBlog";
import FeaturesBlog from "../Pages/FeaturesBlog";
import Wishllist from "../Pages/Wishllist";
import Register from "../Pages/RegisterOrLoginPage/Register";
import Login from "../Pages/RegisterOrLoginPage/Login";
import Home from "../Component/Home/Home";
import PrivateRoutes from "../Layout/PrivataRoute/PrivateRoute";
import AllBlog from "../Pages/AllBlog/AllBlog";
import AllBlogDetails from "../Pages/AllBlog/AllBlogDetails";
import Update from "../Pages/AllBlog/Update";
import FavoriteDetails from "../Pages/FavoriteDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all_blogs",
        element: <AllBlog />,
      },
      {
        path: "/add_blogs",
        element: (
          <PrivateRoutes>
            {" "}
            <AddBlog />{" "}
          </PrivateRoutes>
        ),
      },
      // features blog post
      {
        path: "/features_blogs",
        element: <FeaturesBlog />,
        loader: () => fetch("https://blog-website-server-ochre.vercel.app/favorite")
      },
      {
        path: "/favorite/:id",
        element: <FavoriteDetails />,
        loader: async({params}) => {
          const res = await fetch("https://blog-website-server-ochre.vercel.app/favorite");
          const data = await res.json();
          const singleData = data.find((post) => post._id === params.id);
          
          return singleData
        }
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoutes>
            {" "}
            <Wishllist />{" "}
          </PrivateRoutes>
        ),
      },
      // post detail
      {
        path: "/post_detail/:id",
        element: (
          <PrivateRoutes>
            {" "}
            <AllBlogDetails />{" "}
          </PrivateRoutes>
        ),
        loader: async ({ params }) => {
          // post loader
          const res = await fetch("https://blog-website-server-ochre.vercel.app/post");
          const data = await res.json();
          const singleData = data.find((post) => post._id === params.id);
          return singleData
        },
      },
      // update blog post 
      {
        path: "/update_post/:id",
        element: <PrivateRoutes> <Update /> </PrivateRoutes>,
        loader: ({params}) => fetch(`https://blog-website-server-ochre.vercel.app/post/${params.id}`)
      },
      // Register
      {
        path: "/register",
        element: <Register />,
      },
      // Login
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;

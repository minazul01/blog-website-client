import { createBrowserRouter } from "react-router-dom";
import App from "../Layout/App";

import AllBlog from "../Pages/AllBlog";
import AddBlog from "../Pages/AddBlog";
import FeaturesBlog from "../Pages/FeaturesBlog";
import Wishllist from "../Pages/Wishllist";
import Register from "../Pages/RegisterOrLoginPage/Register";
import Login from "../Pages/RegisterOrLoginPage/Login";
import Home from "../Component/Home/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
     children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/all_blogs",
            element: <AllBlog />
        },
        {
            path: "/add_blogs",
            element: <AddBlog />
        },
        {
            path: "/features_blogs",
            element: <FeaturesBlog />
        },
        {
            path: "/wishlist",
            element: <Wishllist />
        },
        // Register
        {
            path: "/register",
            element: <Register />
        },
        // Login 
        {
            path: "/login",
            element: <Login />
        }
     ]
  },
]);

export default router;

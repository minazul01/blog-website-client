import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // ✅ Import CSS here
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes.jsx";
import NewProvider from "./Layout/Authentication/NewProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NewProvider>
      <RouterProvider router={router} />
    </NewProvider>
  </StrictMode>
);

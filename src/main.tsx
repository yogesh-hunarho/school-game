import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
// import { ThemeProvider } from "@/provider/theme-provider.tsx"

import { RouterProvider } from "react-router-dom";
import router from "./router.jsx"
import { ThemeProvider } from "./provider/theme-provider.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
)

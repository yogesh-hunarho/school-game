import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
// import { ThemeProvider } from "@/provider/theme-provider.tsx"

import { RouterProvider } from "react-router-dom";
import router from "./router.jsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    </ThemeProvider> */}
  </StrictMode>
)

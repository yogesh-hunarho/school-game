
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedLayout from "./layouts/ProtectedLayout";
import PublicLayout from "./layouts/PublicLayout";
import Login from "./view/login";
import NotFound from "./view/not-found";
import Signup from "./view/sign-up";
import MainLayout from "./layouts/main";
import ProfilePage from "./view/profile";
import CoursesLayout from "./layouts/courses";
import ModuleDetailsPage from "./view/ModuleDetailsPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedLayout />,
        children: [
            {
                path: '/',
                element: <MainLayout />
            },
            {
                path: '/courses',
                element: <CoursesLayout />
            },
            {
                path: '/profile',
                element: <ProfilePage />
            },
            {
                path: '/module/:moduleId',
                element: <ModuleDetailsPage />
            },
        ]
    },
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default router;

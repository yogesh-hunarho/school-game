import { Navigate, Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { useLayoutEffect } from "react";

export default function PublicLayout() {
    const token = useAuthStore((state) => state.token);
    const location = useLocation();

    useLayoutEffect(() => {
        document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [location.pathname]);

    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <div id="guestLayout">
            <Outlet />
            <ScrollRestoration />
        </div>
    );
}

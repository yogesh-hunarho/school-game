import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function PublicLayout() {
    const token = useAuthStore((state) => state.token);

    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <div id="guestLayout">
            <Outlet />
        </div>
    );
}

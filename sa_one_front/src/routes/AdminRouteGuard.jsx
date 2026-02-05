import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

// export default function AdminRouteGuard() {
//     const { role, accessToken } = useAuthStore((state) => ({
//         role: state.role,
//         accessToken: state.accessToken,
//     }));

//     if (!accessToken) {
//         return <Navigate to="/login" replace />;
//     }

//     const isAdmin = role === "ADMIN" || role === "ROLE_ADMIN";

//     if (!isAdmin) {
//         return <Navigate to="/" replace />;
//     }

//     return <Outlet />;
// }



export default function AdminRouteGuard() {
    const role = useAuthStore((s) => s.role);
    const accessToken = useAuthStore((s) => s.accessToken);

    if (!accessToken) return <Navigate to="/login" replace />;

    const isAdmin = role === "ADMIN" || role === "ROLE_ADMIN";
    if (!isAdmin) return <Navigate to="/" replace />;

    return <Outlet />;
}
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../apis/axiosInstance";
import { useAuthStore } from "../../stores/useAuthStore";

export default function OAuth2CallbackPage() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const accessToken = params.get("accessToken");

    const login = useAuthStore((s) => s.login);

    useEffect(() => {
        const run = async () => {
            if (!accessToken) {
                navigate("/login", { replace: true });
                return;
            }

            localStorage.setItem("accessToken", accessToken);

            const me = await axiosInstance.get("/api/users/me");
            const roleName = me.data?.role;

            login(accessToken, roleName);

            if (roleName === "ADMIN") navigate("/admin", { replace: true });
            else if (roleName === "OWNER") navigate("/owner", { replace: true });
            else navigate("/employee", { replace: true });
        };

        run().catch(() => navigate("/login", { replace: true }));
    }, [accessToken, login, navigate]);

    return null;
}
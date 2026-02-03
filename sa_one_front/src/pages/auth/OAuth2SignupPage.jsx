import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../apis/axiosInstance";
import { useAuthStore } from "../../stores/useAuthStore";

export default function OAuth2SignupPage() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const tempToken = params.get("tempToken");

    const login = useAuthStore((s) => s.login);

    const [form, setForm] = useState({
        username: "",
        phone: "",
        birthDate: "",
        gender: "",
    });

    useEffect(() => {
        if (!tempToken) navigate("/login", { replace: true });
    }, [tempToken, navigate]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const submit = async () => {
        const res = await axiosInstance.post(
            "/api/auth/oauth2/signup",
            form,
            { headers: { Authorization: `Bearer ${tempToken}` } }
        );

        const accessToken = res.data;

        localStorage.setItem("accessToken", accessToken);

        const me = await axiosInstance.get("/api/users/me");
        const roleName = me.data?.role;

        login(accessToken, roleName);

        if (roleName === "OWNER") navigate("/owner", { replace: true });
        else navigate("/employee", { replace: true });
    };

    return (
        <div style={{ padding: 24 }}>
            <h2>추가 정보 입력</h2>

            <input
                name="username"
                placeholder="username"
                value={form.username}
                onChange={onChange}
            />

            <input
                name="phone"
                placeholder="phone"
                value={form.phone}
                onChange={onChange}
            />

            <input
                name="birthDate"
                placeholder="YYYY-MM-DD"
                value={form.birthDate}
                onChange={onChange}
            />

            <button onClick={submit}>가입 완료</button>
        </div>
    );
}
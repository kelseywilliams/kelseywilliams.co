import { Outlet, Link, createRoutesFromElements } from "react-router";
import Footer from "../components/Footer.jsx";
import Toast from "../components/Toast.jsx";
import { useSessionStore } from "../store/useSessionStore.js";
import { PROTOCOL, API_DOMAIN } from "../config/index.js";
import { useEffect } from "react"
import axios from "axios"

export default function HomeLayout() {
    const toasts = useSessionStore((s) => s.toasts);
    const setUser = useSessionStore((s) => s.setUser);
    const setLoggedIn = useSessionStore((s) => s.setLoggedIn);

    useEffect(() => {
        axios.get(`${PROTOCOL}://${API_DOMAIN}/auth/user`, { withCredentials: true })
            .then((res) => {
                setUser(res.data.username);
                setLoggedIn(true);
            })
    }, []);

    return (

        // Setup flex container.  Then set the NavBar, Content, and Footer in a col 
        // Set the height to 100% of viewport height
        <div className="flex flex-col flex-1 min-h-dvh">
            <Outlet />
            <Footer />
            <div className="toast toast-end toast-bottom">
                {toasts.map((toast) => (
                    <Toast key={toast.id} msg={toast.msg} status={toast.status} />
                ))}
            </div>
        </div>
    )
}
// Admin.jsx
import AdminDash from "../components/AdminDash.jsx"
import NavBar from "../components/NavBar.jsx"

export default function Admin() {
    return (
        <div className="flex flex-col flex-1 md:min-h-0">
            <NavBar page={"admin"} />
            <title>Admin</title>
            <div className="flex flex-1 items-center justify-center p-4 md:min-h-0">
                <AdminDash />
            </div>
        </div>
    )
}
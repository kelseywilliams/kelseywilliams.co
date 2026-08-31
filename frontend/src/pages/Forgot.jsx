// Forgot.jsx
import ForgotForm from "../components/ForgotForm.jsx"
import NavBar from "../components/NavBar.jsx"

export default function Forgot() {
    return (
        <div className="flex flex-col flex-1">
            <NavBar page={"forgot"} />
            <title>Forgot password</title>
            <div className="flex flex-1 items-center justify-center p-4 md:min-h-0">
                <ForgotForm />
            </div>
        </div>
    )
}
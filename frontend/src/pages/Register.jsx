import RegisterForm from "../components/RegisterForm.jsx"
import NavBar from "../components/NavBar.jsx"

export default function Register() {
    return (
        <div className="flex flex-col flex-1">
            <NavBar page={"register"} />
            <title>Register</title>
            <div className="flex flex-1 items-center justify-center p-4 md:min-h-0">
                <RegisterForm />
            </div>
        </div>
    )
}
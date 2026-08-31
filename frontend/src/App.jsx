import { Route, Routes } from "react-router"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Forgot from "./pages/Forgot.jsx"
import Profile from "./pages/Profile.jsx"
import Admin from "./pages/Admin.jsx"
import Contact from "./pages/Contact.jsx"
import About from "./pages/About.jsx"
import HomeLayout from "./layouts/HomeLayout.jsx"

function App() {
    return (
        <Routes>
            <Route element={<HomeLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot" element={<Forgot />} />
                <Route path="profile" element={<Profile />} />
                <Route path="admin" element={<Admin />} />
                <Route path="contact" element={<Contact />} />
                <Route path="about" element={<About />} />
            </Route>
        </Routes>
    );
}

export default App

import ContactForm from "../components/ContactForm.jsx"
import NavBar from "../components/NavBar.jsx"

export default function Contact() {
    return (
        <div className="flex flex-col flex-1 md:min-h-0">
            <NavBar page={"contact"} />
            <title>Contact</title>
            <div className="flex flex-1 items-center justify-center p-4 md:min-h-0">
                <ContactForm />
            </div>
        </div>
    )
}

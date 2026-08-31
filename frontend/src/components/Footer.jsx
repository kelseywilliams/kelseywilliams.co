import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="bg-neutral text-neutral-content text-center text-sm p-3">
            <Link to="/contact">Contact </Link> 
            |
            <Link to="/about"> About</Link>
        </footer>
    )
}
import KContent from "../components/KContent.jsx"
import NavBar from "../components/NavBar.jsx"

export default function K() {
    return (
        <div className="flex flex-col flex-1 md:min-h-0">
            <NavBar page={"k"} />
            <title>K</title>
            <div className="flex flex-1 items-center justify-center p-4 md:min-h-0">
                <KContent />
            </div>
        </div>
    )
}

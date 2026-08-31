import ShowProjects from "../components/ShowProjects.jsx"
import ShowBlogs from "../components/ShowBlogs.jsx"
import NavBar from "../components/NavBar.jsx"

export default function Home() {
    return (
        <div className="flex flex-col flex-1">
            <NavBar />
            <title>Home</title>
            <h2 className="p-5 font-bold">Good vibes never wrote honest code.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 flex-1 md:min-h-0">
                <div className="h-64 md:h-full overflow-y-auto">
                    <ShowProjects />
                </div>
                <div className="h-64 md:h-full overflow-y-auto">
                    <ShowBlogs />
                </div>
            </div>
        </div>
    )
}
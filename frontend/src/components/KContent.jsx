export default function KContent() {
    const start = new Date(2024, 5, 30);
    const now = new Date();

    const diffMs = now - start;
    const days = Math.floor(diffMs / 86400000);
    const weeks = Math.floor(days / 7);

    let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    if (now.getDate() < start.getDate()) months--;

    let years = now.getFullYear() - start.getFullYear();
    if (now.getMonth() < start.getMonth() || (now.getMonth() === start.getMonth() && now.getDate() < start.getDate())) years--;

    return (
        <div className="card bg-base-200 p-6 w-full max-w-md flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Kelsey and Krisztina</h1>
            <p><span className="font-medium">Days:</span> {days}</p>
            <p><span className="font-medium">Weeks:</span> {weeks}</p>
            <p><span className="font-medium">Months:</span> {months}</p>
            <p><span className="font-medium">Years:</span> {years}</p>
        </div>
    );
}

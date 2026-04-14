import { Link } from "react-router-dom";

export default function Navbar () {
    return (
        <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-semibold bg-amber-400 p-2 rounded-full">
                MyTrip
            </Link>
            <Link to="/add-country" className="bg-blue-700 text-white px-4 py-2 rounded-xl transition hover:bg-blue-800">
                Add Country
            </Link>
        </div>
    );
}


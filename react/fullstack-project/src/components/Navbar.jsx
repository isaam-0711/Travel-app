import { Link } from "react-router-dom";

export default function Navbar () {
    return (
        <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-semibold bg-amber-400 p-1">
                MyTrip
            </Link>
            <Link to="/add-country" className="bg-blue-700 text-white px-4 py-2 rounded-xl">
                Add Country
            </Link>
        </div>
    );
}


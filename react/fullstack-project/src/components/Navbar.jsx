import { Link } from "react-router-dom";

export default function Navbar () {
    return (
        <div className="flex flex-col mt-2 gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <Link to="/" className="items-center text-center text-2xl font-semibold bg-amber-400 p-2 rounded-full inline-block">
                MyTrip
            </Link>
            <div className="flex flex-col gap-2 w-full sm:flex-row sm:w-auto sm:items-center sm:justify-end">
                <Link to="/add-country" className="w-full sm:w-auto text-center bg-blue-700 text-white px-4 py-2 rounded-xl transition hover:bg-blue-800">
                    Add Country
                </Link>
                <Link to="/my-countries" className="w-full sm:w-auto text-center bg-emerald-500 text-white px-4 py-2 rounded-xl transition hover:bg-green-600">
                    My Countries
                </Link>
            </div>
        </div>
    );
}


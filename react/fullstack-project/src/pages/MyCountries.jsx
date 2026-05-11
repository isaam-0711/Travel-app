import { useState, useEffect } from "react";

export default function MyCountries() {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const getCountries = async () => {
            const res = await fetch("http://localhost:4000/get-countries?status=VISITED");
            const response = await res.json();
            setCountries(response);
        }
        getCountries();
    }, []);

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl sm:text-3xl mt-2">Visited Countries</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 pt-8">
                {countries.map((country, index) => (
                    <div className="flex flex-col gap-4 bg-white/80 dark:bg-slate-900/80 p-4 rounded-3xl shadow-md backdrop-blur-sm" key={index}>
                        <img src={country.imgUrl} className="w-full h-48 sm:h-52 object-cover rounded-2xl" />
                        <div className="space-y-2">
                            <h3 className="font-semibold text-xl">{country.name}</h3>
                            <p className="text-sm leading-6 italic text-slate-700 dark:text-slate-200">{country.description}</p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <a href={`/country/${country.id}`} className="inline-flex justify-center items-center rounded-xl bg-blue-700 px-4 py-2 text-center text-white transition hover:bg-blue-800">
                                View Country
                            </a>
                            <a
                                href={`https://www.momondo.no`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex justify-center items-center rounded-xl bg-yellow-500 px-4 py-2 text-center text-white transition hover:bg-yellow-600"
                            >
                                Book Flight to {country.name}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


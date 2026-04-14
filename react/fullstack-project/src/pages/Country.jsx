import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getWeather } from "../API/weather";

export default function Country() {

    const navigate = useNavigate();

    const { id } = useParams();


    const [country, setCountry] = useState({});
    const [weather, setWeather] = useState(null);
    const [weatherError, setWeatherError] = useState("");

    const [success, setSuccess] = useState("");

    const deleteCountry = async () => {
        setSuccess("");

        const res = await fetch("http://localhost:4000/delete-country/" + id, {
            method: "DELETE",
        });

        const response = await res.json();

        if (response.success) {
            setSuccess(response.success);
            setTimeout(() => navigate("/"), 2000);
        }
    }

    useEffect(() => {
        const getCountry = async () => {
            const res = await fetch("http://localhost:4000/get-country/" + id);
            const response = await res.json();
            setCountry(response);
        }

        getCountry();
    }, [id])

    useEffect(() => {
        if (!country?.name) return;

        const fetchWeather = async () => {
            try {
                const data = await getWeather(country.name);
                setWeather(data);
                setWeatherError("");
            } catch (err) {
                setWeatherError("Could not load weather.");
                setWeather(null);
            }
        };

        fetchWeather();
    }, [country.name]);

    return (
        <div className="flex flex-col gap-6 pt-8">
            {success ? <p className="bg-green-500 text-white p-4 rounded-xl">
                {success}
            </p> : null
            }
            <img src={country.imgUrl} className="w-full h-100 object-cover rounded-xl" />
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-semibold">
                    {country.name}
                </h1>
                <div className="flex gap-2">
                    <button onClick={deleteCountry} className="bg-red-500 py-2 px-4 text-white rounded-xl transition hover:bg-red-600">Delete</button>
                    <Link to={"/update-country/" + id} className="bg-blue-700 py-2 px-4 text-white rounded-xl transition hover:bg-blue-800">Edit</Link>
                </div>
            </div>
            <p>
                {country.description}
            </p>

            {weatherError && <p className="text-red-500">{weatherError}</p>}

            {weather ? (
                <div className="mt-4 p-4 bg-slate-50 rounded-lg border">
                    <h2 className="text-xl font-semibold">Weather in {country.name}</h2>
                    <p>Condition: {weather.current.condition.text}</p>
                    <p>Temp: {weather.current.temp_c}°C</p>
                    <p>Feels like: {weather.current.feelslike_c}°C</p>
                    <p>Humidity: {weather.current.humidity}%</p>
                    <p>Wind: {weather.current.wind_kph} kph</p>
                </div>
            ) : (
                !weatherError && <p className="text-slate-500">Loading weather...</p>
            )}

        </div>
    );
}


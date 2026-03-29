import { useState } from "react";
import { getWeather } from "../API/weather";

export default function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!city.trim()) {
            setError("Please enter a city name.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const data = await getWeather(city);
            setWeather(data);
        } catch (err) {
            setError("Could not fetch weather data. Please try again.");
            setWeather(null);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="p-4">
            <input
                className="border p-2"
                placeholder="Enter city"
                onChange={(e) => setCity(e.target.value)}
            />

            <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 py-2 ml-2"
            >
                Search
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}
            {loading && <p className="mt-4">Loading...</p>}
            {weather && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold">
                        {weather.location.name}, {weather.location.region}
                    </h2>
                    <p>Condition: {weather.current.condition.text}</p>
                    <p>Temperature: {weather.current.temp_c}°C</p>
                    <p>Feels like: {weather.current.feelslike_c}°C</p>
                    <p>Humidity: {weather.current.humidity}%</p>
                    <p>Wind: {weather.current.wind_kph} kph</p>
                </div>
            )}
        </div>
    );

}
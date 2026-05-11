import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateCountry () {

    const navigate = useNavigate();

    const { id } = useParams();
    const [country, setCountry] = useState({});
    
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");


  
    const updateCountry = async () => {
        setSuccess("");
        setError("");

        if (!country.name || !country.description || !country.imgUrl) {
            setError("You've left empty fields.");
            return;
        }

        const res = await fetch("http://localhost:4000/update-country/" + id, {
            method: "PATCH",
            body: JSON.stringify(country),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const response = await res.json();

        if (response.success) {
            setSuccess(response.success);
            setTimeout(() => navigate("/country/" + id), 1200);
        } else if (response.error) {
            setError(response.error);
        }

    }

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setCountry((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    useEffect(() => {
        const getCountry = async () => {
            const res = await fetch("http://localhost:4000/get-country/" + id);
            const response = await res.json();
            setCountry(response || {});
        };

        getCountry();
    }, [id]);

    return (
        <div className="max-w-xl mx-auto flex flex-col gap-4 pt-8 bg-slate-50 p-4 sm:p-6 mt-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold">Update {country.name}</h2>
            {success ? 
            <p className="bg-green-500 text-white p-4 rounded-xl">
                {success}
            </p> : null
        }

            {error ? 
            <p className="bg-red-500 text-white p-4 rounded-xl">
                {error}
            </p>: null    
        }
            <input name="name" value={country.name || ""} onChange={handleFormChange} placeholder="Name" className="w-full p-3 border-2 border-gray-200 rounded-xl" />
            <input name="description" value={country.description || ""} onChange={handleFormChange} placeholder="Description" className="w-full p-3 border-2 border-gray-200 rounded-xl" />
            <input name="imgUrl" value={country.imgUrl || ""} onChange={handleFormChange} placeholder="Image URL" className="w-full p-3 border-2 border-gray-200 rounded-xl" />
            <button onClick={updateCountry} className="w-full sm:w-auto px-4 py-3 bg-emerald-500 text-white rounded-xl transition hover:bg-green-600">Update Country</button>
        </div>
    );
}
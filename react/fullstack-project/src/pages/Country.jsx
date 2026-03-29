import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function Country () {

    const navigate = useNavigate();

    const { id } = useParams(); 


    const [country, setCountry] = useState({});

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
                    <button onClick={deleteCountry} className="bg-red-500 py-2 px-4 text-white rounded-xl">Delete</button>
                    <Link to={"/update-country/" + id} className="bg-blue-700 py-2 px-4 text-white rounded-xl">Edit</Link>
                </div>
            </div>
            <p>
                {country.description}
            </p>
        </div>
    );
}


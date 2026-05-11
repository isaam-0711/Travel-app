import { useState } from "react";

export default function AddCountry() {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imgUrl: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({

      ...prevFormData,
      [name]: value

    }));


  }

  const submitCountry = async () => {
    await fetch("http://localhost:4000/add-country", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    })

      .then(async (data) => {
        const response = await data.json();

        if (response.success) {
          setSuccess(response.success);

        } else if (response.error) {
          setError(response.error);

        }
      });

  }

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-4 pt-8 bg-slate-50 p-4 sm:p-6 mt-4 rounded-xl shadow-sm">
      {success ?
        <p className="bg-green-500 text-white p-4 rounded-xl">
          {success}
        </p> : null
      }
      {error ?
        <p className="bg-red-500 text-white p-4 rounded-xl">
          {error}
        </p> : null
      }
      <input name="name" value={formData.name} placeholder="Name" onChange={handleFormChange} className="w-full p-3 border-2 border-gray-200 rounded-xl" />
      <input name="description" value={formData.description} placeholder="Description" onChange={handleFormChange} className="w-full p-3 border-2 border-gray-200 rounded-xl" />
      <input name="imgUrl" value={formData.imgUrl} onChange={handleFormChange} placeholder="ImgUrl" className="w-full p-3 border-2 border-gray-200 rounded-xl" />
      <button onClick={submitCountry} className="w-full sm:w-auto px-4 py-3 text-white bg-blue-500 rounded-xl transition hover:bg-blue-800">
        Add Country
      </button>
    </div>
  );
}

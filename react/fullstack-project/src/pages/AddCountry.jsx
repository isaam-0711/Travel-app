import { useState } from "react";

export default function AddCountry () {
  
  const [formData, setFormData ] = useState({
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
        <div className="flex flex-col gap-4 pt-8">
          <h2 className="text-xl text-white">
            Add New Country
          </h2>
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
          <input name="name" value={formData.name}  placeholder="Name" onChange={handleFormChange} className="p-2 border-2 broder-gray-200 rounded-xl text-white" />
          <input name="description" value={formData.description}placeholder="Description"  onChange={handleFormChange}  className="p-2 border-2 broder-gray-200 rounded-xl text-white" />
          <input name="imgUrl" value={formData.imgUrl} onChange={handleFormChange} placeholder="ImgUrl" className="p-2 border-2 broder-gray-200 rounded-xl text-white" />
          <button onClick={submitCountry} className="px-4 py-2 bg-blue-500 text-white rounded-xl">
            Add Country 
          </button>
        </div>
  );
}

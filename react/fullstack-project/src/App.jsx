import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AddCountry from "./pages/AddCountry";
import Country from "./pages/Country";
import UpdateCountry from "./pages/UpdateCountry";
import MyCountries from "./pages/MyCountries";




function App() {
  return (
    <main className="px-4 py-6 sm:px-6 md:px-10 lg:px-24 min-h-screen relative z-10 max-w-screen-2xl mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-country" element={<AddCountry />} />
        <Route path="/country/:id" element={<Country />} />
        <Route path="/update-country/:id" element={<UpdateCountry />} />
        <Route path="/my-countries" element={<MyCountries />} />
      </Routes>
    </main>
  );

}

export default App;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const getCountries = async () => {
            await fetch("http://localhost:4000/get-countries")
                .then(async (data) => {
                    const response = await data.json();
                    setCountries(response);
                });
        }

        getCountries();
    }, []);


    return (
        <>
            <h1 className="font-bold text-xl mt-2 ">My countries</h1>
            <div className="grid grid-cols-4 gap-10 pt-10">
                {countries.map((country, index) => (
                    <div className="flex flex-col gap-4" key={index}>
                        <img src={country.imgUrl} className="w-full h-48 object-cover rounded-xl" />
                        <h3 className="font-semibold text-xl">{country.name}</h3>
                        <h2 className="italic">{country.description}</h2>
                        <Link to={`/country/${country.id}`} className="bg-blue-700 px-4 py-2 text-center text-white rounded-xl">
                            View Country
                        </Link>
                        <a
                            href={`https://www.momondo.no`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-yellow-500 px-4 py-2 text-center text-white rounded-xl"
                        >
                            Book Flight
                        </a>
                    </div>
                ))}
            </div>

            <section className="mt-12 p-6 bg-slate-100 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Blog</h2>
                <p className="mb-4">Discover travel tips & country-blog</p>
                <div className="space-y-4">
                    <article className="p-4 bg-white rounded-lg border">
                        <h3 className="font-semibold">Italy</h3>
                        <p className="text-sm text-slate-600">Venice is a unique and enchanting destination in Italy, famous for its canals, historic architecture, and romantic atmosphere. Built on a network of islands, the city offers unforgettable experiences like gondola rides along the Grand Canal and visits to landmarks such as St. Mark’s Basilica. Visitors can wander through narrow streets, discover hidden squares, and enjoy authentic Italian cuisine. 
                            With its rich history, artistic heritage, and timeless charm, Venice is a must-visit destination for travelers seeking culture, beauty, and a one-of-a-kind experience.
                            <a className="text-blue-500 italic"href="https://theitalyblog.com/"> Read more here</a>
                        </p>

                    </article>
                    <article className="p-4 bg-white rounded-lg border">
                        <h3 className="font-semibold">Brazil</h3>
                        <p className="text-sm text-slate-600">Visit Rio de jainero: 
                            Brazil is a vibrant and diverse destination known for its stunning natural beauty, rich culture, and lively atmosphere. From the iconic beaches of Rio de Janeiro to the vast Amazon rainforest, the country offers something for every type of traveler. Visitors can explore colorful cities, experience world-famous festivals like Carnival, and enjoy delicious local cuisine. 
                            With a warm climate, welcoming people, and endless opportunities for adventure, Brazil is a perfect destination for those seeking both relaxation and excitement.
                             <a className="text-blue-500 italic" href="https://thehelpfulstranger.blog/brazil-travel/"> Read more here</a>
                        </p>
                       
                    </article>
                </div>
            </section>
        </>
    );
}
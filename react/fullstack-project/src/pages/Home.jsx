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
        <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl sm:text-3xl mt-2">Countries to visit</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 pt-8">
                {countries.map((country, index) => (
                    <div className="flex flex-col gap-4 bg-white/80 dark:bg-slate-900/80 p-4 rounded-3xl shadow-md backdrop-blur-sm" key={index}>
                        <img src={country.imgUrl} className="w-full h-48 sm:h-52 object-cover rounded-2xl" />
                        <div className="space-y-2">
                            <h3 className="font-semibold text-xl">{country.name}</h3>
                            <p className="text-sm leading-6 italic text-slate-700 dark:text-slate-200">{country.description}</p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Link to={`/country/${country.id}`} className="inline-flex justify-center items-center rounded-xl bg-blue-700 px-4 py-2 text-center text-white transition hover:bg-blue-800">
                                View Country
                            </Link>
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

            <section>
                <h2 className="text-2xl font-bold mb-4">Blog</h2>
                <p className="mb-4">Discover travel tips & country-blog</p>
                <div className="space-y-4">
                    <article className="p-4 bg-white rounded-lg border">
                        <h3 className="font-semibold">Italy</h3>
                        <p>Visit Venice: a unique and enchanting destination in Italy, famous for its canals, historic architecture, and romantic atmosphere. Built on a network of islands, the city offers unforgettable experiences like gondola rides along the Grand Canal and visits to landmarks such as St. Mark’s Basilica. Visitors can wander through narrow streets, discover hidden squares, and enjoy authentic Italian cuisine. 
                            With its rich history, artistic heritage, and timeless charm, Venice is a must-visit destination for travelers seeking culture, beauty, and a one-of-a-kind experience.
                            <a className="text-blue-500 italic"href="https://theitalyblog.com/"> Read more here</a>
                        </p>

                    </article>
                    <article className="p-4 bg-white rounded-lg border">
                        <h3 className="font-semibold">Brazil</h3>
                        <p>Visit Rio de jainero: 
                            Brazil is a vibrant and diverse destination known for its stunning natural beauty, rich culture, and lively atmosphere. From the iconic beaches of Rio de Janeiro to the vast Amazon rainforest, the country offers something for every type of traveler. Visitors can explore colorful cities, experience world-famous festivals like Carnival, and enjoy delicious local cuisine. 
                            With a warm climate, welcoming people, and endless opportunities for adventure, Brazil is a perfect destination for those seeking both relaxation and excitement.
                             <a className="text-blue-500 italic" href="https://thehelpfulstranger.blog/brazil-travel/"> Read more here</a>
                        </p>
                       
                    </article>
                    <article className="p-4 bg-white rounded-lg border">
                        <h3 className="font-semibold">Oman</h3>
                        <p>Visit Muscat: 
                            Oman is a peaceful Arabian Peninsula country known for its dramatic desert dunes, rugged mountains, and warm hospitality. Muscat, the capital, sits on the Gulf of Oman and blends modern waterfronts with historic forts, colorful souks, and serene mosques.
                            <a className="text-blue-500 italic" href="https://www.tuljak.com/blog/destination-profile-oman"> Read more here</a>
                        </p>
                    </article>
                </div>
            </section>
            </div>
    );

}
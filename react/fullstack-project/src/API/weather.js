
export const getWeather = async (city) => {
  const apiKey = "3ada56404f13458da34171833262903";

  const res = await fetch(
    `http://api.weatherapi.com/v1/current.json?q=${city}&units=metric&key=${apiKey}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  return res.json();
};
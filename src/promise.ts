import https from "https";
import type { WeatherData, NewsData } from "./types.js";

function fetchLocation(city: string
): Promise<{ latitude: number; longitude: number }> {
    console.log(`Finding location for ${city}...`);
    return new Promise((resolve, reject) => {
        const url =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
        https.get(url, (response) => {
            let data = "";
            response.on("data", (chunk) => {
                data += chunk;
            });
            response.on("end", () => {
                try {
                    const result = JSON.parse(data);
                    if (!result.results || result.results.length === 0) {
                        reject(new Error("City not found"));
                        return;
                    }
                    const location = {
                        latitude: result.results[0].latitude,
                        longitude: result.results[0].longitude
                    };
                    resolve(location);
                } catch (error) {
                    reject(error);
                }
            });
        }).on("error", (error) => {
            reject(error);
        });
    });
}

function fetchWeather( latitude: number,longitude: number): Promise<WeatherData> {
    console.log("Fetching weather data...");
    return new Promise((resolve, reject) => {
        const url =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

        https.get(url, (response) => {
            let data = "";
            response.on("data", (chunk) => {
                data += chunk;
            });
            response.on("end", () => {
                try {
                    const result = JSON.parse(data);
                    const weatherData: WeatherData = {
                        temperature: result.current.temperature_2m,
                        humidity: result.current.relative_humidity_2m,
                        windSpeed: result.current.wind_speed_10m
                    };
                    resolve(weatherData);
                } catch (error) {
                    reject(error);
                }
            });
        }).on("error", (error) => {
            reject(error);
        });
    });
}

function fetchNews(): Promise<NewsData[]> {
    console.log("Fetching news...");
    return new Promise((resolve, reject) => {
        const url = "https://dummyjson.com/posts";
        https.get(url, (response) => {
            let data = "";
            response.on("data", (chunk) => {
                data += chunk;
            });
            response.on("end", () => {
                try {
                    const result = JSON.parse(data);
                    const newsData: NewsData[] = result.posts.slice(0, 5);
                    resolve(newsData);
                } catch (error) {
                    reject(error);
                }
            });
        }).on("error", (error) => {
            reject(error);
        });
    });
}


const city = process.argv[2] || "Pietermaritzburg";


// Promise chaining

console.log("\nPROMISE CHAINING");

fetchLocation(city)
    .then((location) => {
        return fetchWeather(location.latitude, location.longitude);
    })
    .then((weather) => {
        console.log("\nWeather:");
        console.log(`Location: ${city}`);
        console.log(`Temperature: ${weather.temperature}°C`);
        console.log(`Humidity: ${weather.humidity}%`);
        console.log(`Wind Speed: ${weather.windSpeed} km/h`);

        return fetchNews();
    })
    .then((news) => {
        console.log("\nLatest News:");

        news.forEach((post, index) => {
            console.log(`${index + 1}. ${post.title}`);
        });
    })
    .catch((error) => {
        console.error("\nError:", error.message);
    });


// Promise.all()

console.log("\nPROMISE.ALL()");

fetchLocation(city)
    .then((location) => {
        return Promise.all([
            fetchWeather(location.latitude, location.longitude),
            fetchNews()
        ]);
    })
    .then(([weather, news]) => {
        console.log("\nBoth requests completed!");
        console.log("\nWeather:");
        console.log(`Location: ${city}`);
        console.log(`Temperature: ${weather.temperature}°C`);
        console.log(`Humidity: ${weather.humidity}%`);
        console.log(`Wind Speed: ${weather.windSpeed} km/h`);
        console.log("\nLatest News:");
        news.forEach((post, index) => {
            console.log(`${index + 1}. ${post.title}`);
        });
    })
    .catch((error) => {
        console.error("\nPromise.all Error:", error.message);
    });


// Promise.race()

console.log("\nPROMISE.RACE()");

fetchLocation(city)
    .then((location) => {
        return Promise.race([
            fetchWeather(location.latitude, location.longitude)
                .then(() => "Weather API responded first"),
            fetchNews()
                .then(() => "News API responded first")
        ]);
    })
    .then((result) => {
        console.log("\nFastest response:");
        console.log(result);
    })
    .catch((error) => {
        console.error("\nPromise.race Error:", error.message);
    });


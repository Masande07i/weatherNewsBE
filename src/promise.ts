import https from "https";
import type { WeatherData, NewsData } from "./types.js"

function fetchWeather(): Promise<WeatherData> {
    console.log("Fetching weather data...");

    return new Promise((resolve, reject) => {
        const url =
            "https://api.open-meteo.com/v1/forecast?latitude=-29.8587&longitude=31.0218&current=temperature_2m,relative_humidity_2m,wind_speed_10m";

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


// Promise chaining

console.log("\nPROMISE CHAINING");

fetchWeather()
    .then((weather) => {
        console.log("\nWeather:");
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

Promise.all([fetchWeather(), fetchNews()])
    .then(([weather, news]) => {
        console.log("\nBoth requests completed!");

        console.log("\nWeather:");
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

Promise.race([
    fetchWeather().then(() => "Weather API responded first"),
    fetchNews().then(() => "News API responded first")
])
    .then((result) => {
        console.log("\nFastest response:");
        console.log(result);
    })
    .catch((error) => {
        console.error("\nPromise.race Error:", error.message);
    });


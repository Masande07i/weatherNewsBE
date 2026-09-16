import https from "https";
import type { WeatherData, NewsData } from "./types.js";

function fetchLocation( city: string): Promise<{ latitude: number; longitude: number }> {
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

function fetchWeather(latitude: number,longitude: number): Promise<WeatherData> {
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

async function processWeatherAndNews(): Promise<void> {
    try {
        const city = process.argv[2] || "Pietermaritzburg";
        console.log("Starting async process...");
        const location = await fetchLocation(city);
        const weather: WeatherData = await fetchWeather(
            location.latitude,
            location.longitude
        );
        console.log("\nWeather:");
        console.log(`Location: ${city}`);
        console.log(`Temperature: ${weather.temperature}°C`);
        console.log(`Humidity: ${weather.humidity}%`);
        console.log(`Wind Speed: ${weather.windSpeed} km/h`);

        const news: NewsData[] = await fetchNews();
        console.log("\nLatest News:");
        news.forEach((post: NewsData, index: number) => {
            console.log(`${index + 1}. ${post.title}`);
        });

        console.log("\nAll operations completed successfully");
    } catch (error: any) {
        console.error(
            "An error occurred in this process:",
            error.message
        );
    }
}

processWeatherAndNews();


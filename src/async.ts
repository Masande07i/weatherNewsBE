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

async function processWeatherAndNews(): Promise<void> {

    try {
        console.log("Starting async process...");
        const weather: WeatherData = await fetchWeather();
        console.log("\nWeather:");
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
    }}

processWeatherAndNews();


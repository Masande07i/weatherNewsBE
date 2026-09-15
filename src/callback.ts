import https from "https";
import type { WeatherData, NewsData } from "./types.js"

function fetchWeather(
    callback: (error: Error | null, weatherData?: WeatherData) => void
) {
    console.log("Fetching weather data...");

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
                callback(null, weatherData);
            } catch (error) {
                callback(error as Error);
            }
        });
    }).on("error", (error) => {
        callback(error);
    });
}

function fetchNews(
    callback: (error: Error | null, newsData?: NewsData[]) => void
) {
    console.log("Fetching news...");
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
                callback(null, newsData);
            } catch (error) {
                callback(error as Error);
            }
        });
    }).on("error", (error) => {
        callback(error);
    });
}

function displayResults(
    weatherData: WeatherData,
    newsData: NewsData[],
    callback: (error: Error | null, status?: string) => void
) {
    console.log("Displaying results...");
    setTimeout(() => {
        console.log("\nWeather:");
        console.log(`Temperature: ${weatherData.temperature}°C`);
        console.log(`Humidity: ${weatherData.humidity}%`);
        console.log(`Wind Speed: ${weatherData.windSpeed} km/h`);
        console.log("\nLatest News:");
        newsData.forEach((news, index) => {
            console.log(`${index + 1}. ${news.title}`);
        });
        callback(null, "Successfully displayed weather and news");
    }, 1000);
}

fetchWeather((error, weatherData) => {
    if (error) {
        console.error("Error fetching weather:", error.message);
        return;
    }
    if (weatherData) {
        fetchNews((error, newsData) => {
            if (error) {
                console.error("Error fetching news:", error.message);
                return;
            }
            if (newsData) {
                displayResults(weatherData, newsData, (error, status) => {
                    if (error) {
                        console.error("Error displaying results:", error.message);
                        return;
                    }
                    if (status) {
                        console.log("All operations completed");
                        console.log("Final status:", status);
                    }});
            }});
    }});


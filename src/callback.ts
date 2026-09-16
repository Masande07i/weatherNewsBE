import https from "https";
import type { WeatherData, NewsData } from "./types.js";

function fetchLocation(city: string,callback: ( error: Error | null,
        location?: { latitude: number; longitude: number }) => void) {
    console.log(`Finding location for ${city}...`);
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    https.get(url, (response) => {
        let data = "";
        response.on("data", (chunk) => {
            data += chunk;
        });
        response.on("end", () => {
            try {
                const result = JSON.parse(data);
                if (!result.results || result.results.length === 0) {
                    callback(new Error("City not found"));
                    return;
                }
                const location = {
                    latitude: result.results[0].latitude,
                    longitude: result.results[0].longitude
                };
                callback(null, location);
            } catch (error) {
                callback(error as Error);
            }
        });
    }).on("error", (error) => {
        callback(error);
    });
}


function fetchWeather(latitude: number,longitude: number,
    callback: (error: Error | null, weatherData?: WeatherData) => void) {
    console.log("Fetching weather data...");
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
    callback: (error: Error | null, newsData?: NewsData[]) => void) {
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

function displayResults(city: string,weatherData: WeatherData,newsData: NewsData[],
    callback: (error: Error | null, status?: string) => void) {
    console.log("Displaying results...");
    setTimeout(() => {
        console.log("\nWeather:");
        console.log(`Location: ${city}`);
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


const city = process.argv[2] || "Pietermaritzburg";
fetchLocation(city, (error, location) => {
    if (error) {
        console.error("Error finding location:", error.message);
        return;
    }
    if (location) {
        fetchWeather(location.latitude, location.longitude, (error, weatherData) => {
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
                        displayResults(
                            city,
                            weatherData,
                            newsData,
                            (error, status) => {
                                if (error) {
                                    console.error(
                                        "Error displaying results:",
                                        error.message
                                    );
                                    return;
                                }
                                if (status) {
                                    console.log("All operations completed");
                                    console.log("Final status:", status);
                                }});
                    }});
            }});
    }});
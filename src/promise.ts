import https from "https";

function promiseFetchWeather(): Promise<any> {

    console.log("Fetching weather data...");

    return new Promise((resolve, reject) => {

        const url =
            "https://api.open-meteo.com/v1/forecast?latitude=-29.8587&longitude=30.9945&current=temperature_2m,relative_humidity_2m,wind_speed_10m";

        https.get(url, (response) => {

            let data = "";

            response.on("data", (chunk) => {
                data += chunk;
            });

            response.on("end", () => {

                try {

                    const result = JSON.parse(data);

                    const weatherData = {
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


function promiseFetchNews(): Promise<any> {

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

                    const newsData = result.posts.slice(0, 5);

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


function displayResults(weatherData: any, newsData: any): Promise<string> {

    console.log("Displaying results...");

    return new Promise((resolve) => {

        setTimeout(() => {

            console.log("\nWeather:");
            console.log(`Temperature: ${weatherData.temperature}°C`);
            console.log(`Humidity: ${weatherData.humidity}%`);
            console.log(`Wind Speed: ${weatherData.windSpeed} km/h`);

            console.log("\nLatest News:");

            newsData.forEach((news: any, index: number) => {
                console.log(`${index + 1}. ${news.title}`);
            });

            resolve("Successfully displayed weather and news");

        }, 1000);

    });
}


promiseFetchWeather()
    .then((weatherData) => {

        return promiseFetchNews().then((newsData) => {
            return displayResults(weatherData, newsData);
        });

    })
    .then((status) => {

        console.log("\nAll operations completed successfully");
        console.log("Final status:", status);

    })
    .catch((error) => {

        console.error(
            "An error occurred in the promise chain:",
            error.message
        );

    });
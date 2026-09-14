
import https from "https";

function fetchWeather(): Promise<any> {
    console.log("Fetching weather data...");
    return new Promise((resolve, reject) => {

        const url =
            "https://api.open-meteo.com/v1/forecast?latitude=-29.8587&longitude=31.0218&current_weather=true";

        https.get(url, (response) => {
            let data = "";
            response.on("data", (chunk) => {
                data += chunk;
            });
            response.on("end", () => {
                try {
                    const result = JSON.parse(data);
                    resolve(result.current_weather);
                } catch (error) {
                    reject(error);
                }
            });

        }).on("error", (error) => {
            reject(error);
        });

    });
}


function fetchNews(): Promise<any> {
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
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });
        }).on("error", (error) => {
            reject(error);
        });
    });
}


//weather-news

console.log("\nPROMISE CHAINING");

fetchWeather()
    .then((weather) => {
        console.log("\nWeather:");
        console.log(`Temperature: ${weather.temperature}°C`);
        console.log(`Wind speed: ${weather.windspeed} km/h`);
        return fetchNews();
    })
    .then((news) => {
        console.log("\nLatest News:");
        news.posts.slice(0, 5).forEach((post: any, index: number) => {
            console.log(`${index + 1}. ${post.title}`);
        });
    })
    .catch((error) => {
        console.error("\nError:", error.message);
    });

//promisse race
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




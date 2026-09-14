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

# ASYNC WEATHER & NEWS DASHBOARD

# PROJECT IMAGE

<img src="https://socialify.git.ci/Masande07i/weatherNewsBE/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="weatherNewsBE" width="640" height="320" />

# PROJECT DESCRIPTION

```Async Weather & News Dashboard is a Node.js and TypeScript application that demonstrates asynchronous programming and the event loop. The application fetches weather data from the Open-Meteo API and news posts from the DummyJSON Posts API. It demonstrates different ways of handling asynchronous operations using callbacks, Promises, async/await, Promise.all(), and Promise.race().```

# Installation and set-up

``` bash

Clone the repository:

git clone https://github.com/Masande07i/weatherNewsBE.git

cd weatherNewsBE
```

# Run App 
``` bash
npm install
# or
yarn install

Callback
npm run callback

Promise
npm run promise

Async/Await
npm run async
```

## Usage

```The application can be run using three different asynchronous programming styles:```
```Callbacks  Fetches weather, then news, and displays the results using nested callbacks.Promises Uses Promise chaining, Promise.all() to handle weather and news together, and Promise.race() to determine which API responds first.Async/Await  Uses async and await with try/catch to make asynchronous code easier to read and handle errors```


## Sample Console Outputs

```Callback```

Fetching weather data...
Fetching news...
Displaying results...

Weather:
Temperature: 24.2°C
Humidity: 62%
Wind Speed: 21.1 km/h

Latest News:
1. His mother had always taught him
2. He was an expert but not in a discipline
3. Dave watched as the forest burned up on the hill.
4. All he wanted was a candy bar.
5. Hopes and dreams were dashed that day.

All operations completed
Final status: Successfully displayed weather and news```

Promise
PROMISE CHAINING
Fetching weather data...

Weather:
Temperature: 24.2°C
Humidity: 62%
Wind Speed: 21.1 km/h

Fetching news...

PROMISE.ALL()
Fetching weather data...
Fetching news...

PROMISE.RACE()
Fetching weather data...
Fetching news...

Fastest response:
Weather API responded first

Both requests completed!

Weather:
Temperature: 24.2°C
Humidity: 62%
Wind Speed: 21.1 km/h

Latest News:
1. His mother had always taught him
2. He was an expert but not in a discipline
3. Dave watched as the forest burned up on the hill.
4. All he wanted was a candy bar.
5. Hopes and dreams were dashed that day.

Async/Await
Starting async process...
Fetching weather data...

Weather:
Temperature: 24.2°C
Humidity: 62%
Wind Speed: 21.1 km/h

Fetching news...

Latest News:
1. His mother had always taught him
2. He was an expert but not in a discipline
3. Dave watched as the forest burned up on the hill.
4. All he wanted was a candy bar.
5. Hopes and dreams were dashed that day.

```All operations completed successfully```

## Learning Outcomes

By completing this project, I learned how to:

Understand asynchronous programming in Node.js.
Use callbacks to handle asynchronous operations.
Understand callback nesting and callback hell.
Create and handle Promises using resolve and reject.
Use .then() and .catch() with Promises.
Use Promise.all() to handle multiple asynchronous operations.
Use Promise.race() to determine which asynchronous operation completes first.
Use async and await to write cleaner asynchronous code.
Use try/catch for error handling with async/await.
Understand how the event loop handles asynchronous operations.
Work with external APIs using Node.js https.
Use TypeScript interfaces to define the structure of weather and news data.



# Tech Stack

## TypeScript
## Node.js
## Open-Meteo API
## DummyJSON API
## HTTPS



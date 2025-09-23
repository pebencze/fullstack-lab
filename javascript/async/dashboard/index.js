const weatherEl = document.getElementById("weather");
const authorEl = document.getElementById("author");
const cryptoTopEl = document.getElementById("crypto-top");
const cryptoEl = document.getElementById("crypto");
const timeEl = document.getElementById("time");

async function updateBackground() {
    try {
        const response = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
        if (!response.ok) {
            throw Error("Something went wrong with the background image request")
        }
        const data = await response.json()
        authorEl.textContent = `by ${data.user.name}`;
        document.body.style.backgroundImage = `url(${data.urls.full})`;
    } catch (error) {
        console.error(error);
        const defaultImageUrl = 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTg1NDUxNTB8&ixlib=rb-4.1.0&q=85';
        document.body.style.backgroundImage = `url(${defaultImageUrl})`;
        authorEl.textContent = `by Unknown Author`;
    }
};

async function fetchAndDisplayCoin() {
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
        if (!response.ok) {
            throw Error(`Error fetching coin data: ${response.status}`)
        }
        const data = await response.json()
        const coinEl = document.createElement("p");
        coinEl.innerHTML = `<img src=${data.image.small}/> <span>${data.name}</span>`
        cryptoTopEl.appendChild(coinEl);
        cryptoEl.innerHTML += ` 
                    <p>Current price: $${data.market_data.current_price.usd}</p> 
                    <p>High price:    $${data.market_data.high_24h.usd}</p> 
                    <p>Low price:     $${data.market_data.low_24h.usd}</p> 
        ` 
    } catch (error) {
        console.error(error);
        cryptoTopEl.textContent = "Crypto data unavailable";
    }
}

function getCurrentTime () {
    const date = new Date();
    timeEl.textContent = date.toLocaleTimeString("en-US", {timeStyle: "medium"});
}

/**
 * Wraps the callback-based navigator.geolocation.getCurrentPosition in a Promise.
 * This allows us to use it with async/await.
 * 
 * Callback-based version:
 *  navigator.geolocation.getCurrentPosition((position) => {
        doSomething(position.coords.latitude, position.coords.longitude);
    });
 */
function getGeolocationWithPromise() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            return reject(new Error("Geolocation is not supported by your browser."));
        }
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

async function fetchAndDisplayWeather(lat, lon) {
    try {
        const response = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`)
        if (!response.ok) {
            throw Error("Weather data not available")
        }
        const data = await response.json()
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        weatherEl.innerHTML = `
            <img src=${iconUrl} />
            <p class="weather-temp">${Math.round(data.main.temp)}°</p>
            <p class="weather-city">${data.name}</p>
        `
    }
    catch (error) {
        console.error(error);
        weatherEl.textContent = "Weather data unavailable";
    }
}

/**
 * Main function to initialize the dashboard.
 */
async function initializeDashboard() {
    // These can run in parallel
    updateBackground();
    fetchAndDisplayCoin();

    // Update time every second
    setInterval(getCurrentTime, 1000);

    // Weather depends on geolocation, so we handle this sequentially
    try {
        const position = await getGeolocationWithPromise();
        fetchAndDisplayWeather(position.coords.latitude, position.coords.longitude);
    } catch (error) {
        console.error(error);
        weatherEl.textContent = "Location data unavailable";
    }
}

initializeDashboard();

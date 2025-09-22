function setBackground() {
    const author = document.getElementById("author");
    fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(response => {
        if (!response.ok) {
            throw Error("Something went wrong with the background image request")
        }
        return response.json()
    })
    .then(data => {
        //console.log(data);
        document.body.style.backgroundImage = `url(${data.urls.full})`;
        author.textContent = `by ${data.user.name}`;
    })
    .catch(error => {
        console.error("Error fetching the background image:", error);
        const defaultImageUrl = 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTg1NDUxNTB8&ixlib=rb-4.1.0&q=85';
        document.body.style.backgroundImage = `url(${defaultImageUrl})`;
        author.textContent = `by Unknown Author`;
    })
};

function getCoinData() {
    fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(response => {
        if (!response.ok) {
            throw Error(`Error fetching coin data: ${response.status}`)
        }
        return response.json()
    })
    .then(data => {
        const coinEl = document.createElement("p")
        coinEl.innerHTML = `<img src=${data.image.small}/> <span>${data.name}</span>`
        document.getElementById("crypto").appendChild(coinEl);
        document.getElementById("crypto").innerHTML += ` 
                    <p>Current price: $${data.market_data.current_price.usd}</p> 
                    <p>High price:    $${data.market_data.high_24h.usd}</p> 
                    <p>Low price:     $${data.market_data.low_24h.usd}</p> 
        ` 
    })
    .catch(error => {
        console.error(error);
    });
    
}

function getCurrentTime () {
    const date = new Date();
    document.getElementById("time").textContent = date.toLocaleTimeString("en-US", {timeStyle: "medium"});
}

setBackground();
getCoinData();
setInterval(getCurrentTime, 1000); // calls the function every 1000ms
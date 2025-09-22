function setBackground() {
    fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.body.style.backgroundImage = `url(${data.urls.full})`;
        const author = document.getElementById("author");
        author.textContent = `by ${data.user.first_name} ${data.user.last_name}`;
    })
    .catch(error => {
        console.error("Error fetching the background image:", error);
    })
};

setBackground();
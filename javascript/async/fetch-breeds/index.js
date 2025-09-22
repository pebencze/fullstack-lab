// one way to fetch
async function getData() {
  const url = "https://dog.ceo/api/breeds/image/random";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json(); // from json to javascript
    console.log(result);
    const imageUrl = result.message;
    // The URL is like "https://images.dog.ceo/breeds/cattledog-australian/n02096294_1937.jpg"
    // We can split it by "/" and get the 5th element (index 4) for the breed name.
    const breed = imageUrl.split('/')[4].replace('-', ' ');
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = `A random ${breed}`;
    image.title = `A random ${breed}`; // This title will be shown by the browser on hover
    document.body.appendChild(image);
  } catch (error) {
    console.error(error.message);
  }
}

getData();

// another way to fetch
fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(data => {
        document.getElementById("image-el").innerHTML = `
        <img src="${data.message}" alt="dog image 2" title="dog image 2"/>
        `
    })
    .catch(error => {
        console.error("Error fetching the dog image:", error);
        const imageEl = document.getElementById("image-el");
        if (imageEl) {
            imageEl.textContent = "Sorry, we couldn't fetch a dog image right now.";
        }
    });
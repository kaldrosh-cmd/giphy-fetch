import { GIPHY_API_KEY } from "./config.js";
const img = document.querySelector("img");
const gifButton = document.querySelector("#gif-button");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const message = document.querySelector("#message");

fetchGif();

async function fetchGif() {
  message.textContent = "";
  try {
    const catData = await getJson(`https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=cats&rating=g`);
    img.src = catData.data.images.original.url;
  } catch (error) {
    message.textContent = `Something went wrong`;
    console.error(error);
  }
}
async function searchGif(event) {
  event.preventDefault();
  const searchText = searchInput.value;
  message.textContent = "";
  try {
    const searchData = await getJson(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(searchText)}&rating=g&limit=10`)
    if (searchData.data.length === 0) {
      message.textContent = `No GIFs found for "${searchText}"`;
      return;
    }
    const randomIndex = Math.floor(Math.random() * searchData.data.length);
    img.src = searchData.data[randomIndex].images.original.url;
  } catch (error) {
    message.textContent = `Something went wrong`;
    console.error(error);
  }
}
async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP status ${response.status}`);
  }
  const data = await response.json();
  return data;
}

gifButton.addEventListener("click", fetchGif);
searchForm.addEventListener("submit", searchGif);

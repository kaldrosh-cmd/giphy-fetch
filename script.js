import { GIPHY_API_KEY } from "./config.js";
const img = document.querySelector('img');
const gifButton = document.querySelector('#gif-button');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const message = document.querySelector('#message');


fetchGif();


function fetchGif() {
  message.textContent = "";
  fetch(`https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=cats&rating=g`)
    .then(function(response) {
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      return response.json();
    })
    .then(function(gifData) {
      img.src = gifData.data.images.original.url;
    })
    .catch(function(error) {
      message.textContent = `Something went wrong`;
      console.error(error.message);
    });
}
function searchGif(event) {
  event.preventDefault();
  const searchText = searchInput.value;
  message.textContent = "";
  

  fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(searchText)}&rating=g&limit=10`)
    .then(function(response) {
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      return response.json();
    })
    .then(function(gifData) {
      if (gifData.data.length === 0) {
        message.textContent = `No GIFs found for "${searchText}"`;
        return;
      }
      const randomIndex = Math.floor(Math.random() * gifData.data.length);
      img.src = gifData.data[randomIndex].images.original.url;
    })
    .catch(function(error) {
      message.textContent = `Something went wrong`;
      console.error(error.message);
    });

}
gifButton.addEventListener('click', fetchGif);
searchForm.addEventListener('submit', searchGif);

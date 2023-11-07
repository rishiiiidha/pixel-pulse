const accessKey = "9OxgAmNOwrI6dxkIVoljV0kKq6CRE_aGuLnSfqjm6VQ";
const formE1 = document.querySelector("form");
const inputE1 = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");
let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputE1.value;
  // we receive the value given into the text box and store inside the inputData 
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const rawResponse = await fetch(url);
  // we sent the request to the Unsplash API through the URL we receive the response when the request is resolved and saved inside the rawResponse which is not human readable
  const data = await rawResponse.json();
  //we again used await because the line should run only once rawResponse is received the request now we use this human readable data

  const results = data.results;
  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.forEach((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper); // Fixed this line
  });
  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}

formE1.addEventListener("submit", (event) => {
  event.preventDefault();
  //prevents the default action to e done
  page = 1;
  searchImages();
});

showMore.addEventListener("click", (event) => {
  searchImages();
});

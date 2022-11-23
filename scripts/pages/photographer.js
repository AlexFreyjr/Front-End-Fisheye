//Get data from JSON
async function getData() {
  return await fetch("./data/photographers.json").then((response) =>
    response.json()
  );
}
//Get ID from URL then call the photos with the same ID
async function getPhotographersId() {
  const searchParams = new URLSearchParams(window.location.search);
  const photographer_id = searchParams.get("id");
  if (photographer_id) {
    //get the media and the specific photographer
    const { media } = await getData();
    const { photographers } = await getData();
    //filter the JSON and and call the function to display the data 
    const photographerSorted = photographers.filter ((name) => name.id == photographer_id);
    displayPhotographersaData(photographerSorted);
    const mediaSorted = media.filter((photos) => photos.photographerId == photographer_id);
    displayMediaData(mediaSorted,photographerSorted);                                                                        
  } else { 
    alert("Pas de media liés a ce photographe"); 
  }
}
//call the factory to display the photographer information in the header
async function displayPhotographersaData(photographer) {
  const header = document.querySelector(".photograph-header");
  const feesHTML = document.querySelector(".right");
  let fees;
  photographer.forEach((photographer) => {
    const headerModel = headerFactory(photographer);
    const userCardDOM = headerModel.getheaderCardDOM();
    header.appendChild(userCardDOM);
    fees = headerModel.fees;
  });
  //feesHTML.innerText(fees);  
}

//call the factory to display photos of the photographer
async function displayMediaData(media,photographer) {
  const mediaSection = document.querySelector(".media_section");
  const addTotalLikes = document.querySelector(".totalLikes");
  const likes = [];
  const date = [];
  const title = [];
  let totalLikes = 0;
  photographer = photographer[0].name;
  photographer = photographer.split(' ');
  media.forEach((media) => {
    const mediaModel = mediaFactory(media,photographer[0]);
    const userCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(userCardDOM);
    likes.push(mediaModel.likes);
    date.push(mediaModel.date);
    title.push(mediaModel.title);
  });
  likes.forEach(i =>{ totalLikes += i});
  //addTotalLikes.innertText(totalLikes.toString());
}
//sorting functions
//listen for change to the submenu
//then call a sorting functions that use .sort to order photos

//lightbox functions
function displayLightbox() {
  const lightbox = document.querySelector("#lightbox");
  lightbox.style.display = "block";
}

function closeLightbox() {
  const lightbox = document.querySelector("#lightbox");
  lightbox.style.display = "none";
}

getPhotographersId();

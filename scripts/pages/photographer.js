async function getPhotographersId() {
  const searchParams = new URLSearchParams(window.location.search);
  const photographer_id = searchParams.get("id");
  if (photographer_id) {
    const { media } = await getData();
    const { photographers } = await getData();
    const photographerSorted = photographers.filter ((name) => name.id == photographer_id);
    displayPhotographersaData(photographerSorted);
    const mediaSorted = media.filter((photos) => photos.photographerId == photographer_id);
    displayMediaData(mediaSorted,photographerSorted);                                                                        
  } else { 
    alert("Pas de media liés a ce photographe"); 
  }
}

async function getData() {
  return await fetch("./data/photographers.json").then((response) =>
    response.json()
  );
}
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

async function displayMediaData(media,photographer) {
  const mediaSection = document.querySelector(".media_section");
  const addTotalLikes = document.querySelector(".totalLikes");
  const likes = [];
  let totalLikes = 0;
  photographer = photographer[0].name;
  photographer = photographer.split(' ');
  media.forEach((media) => {
    const mediaModel = mediaFactory(media,photographer[0]);
    const userCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(userCardDOM);
    likes.push(mediaModel.likes) ;
  });
  likes.forEach(i =>{ totalLikes += i});
  //console.log(totalLikes);
  //addTotalLikes.innerText(totalLikes);
}

function displayLightbox() {
  const lightbox = document.querySelector("#lightbox");
  lightbox.style.display = "block";
}

function closeLightbox() {
  const lightbox = document.querySelector("#lightbox");
  lightbox.style.display = "none";
}

getPhotographersId();

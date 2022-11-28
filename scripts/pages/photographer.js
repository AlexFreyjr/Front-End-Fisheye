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
  let photographer;
  if (photographer_id) {
    //get the media and the specific photographer
    const { media } = await getData();
    const { photographers } = await getData();
    //filter the photographer
    const photographerSorted = photographers.filter ((name) => name.id == photographer_id);
    //get their info for the header
    displayPhotographersaData(photographerSorted);
    //saving just their first name
    photographer = photographerSorted[0].name;
    photographer = photographer.split(' ');
    localStorage.setItem("photographer",photographer[0]);
    //filtering media by photographers
    const mediaSorted = media.filter((photos) => photos.photographerId == photographer_id);
    localStorage.setItem("medias",JSON.stringify(mediaSorted));
    displayMediaData(mediaSorted,photographer[0]);                                                                        
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
    fees = photographer.price;
  })
  feesHTML.textContent = `${fees}€ / jour`;  
}

//call the factory to display photos of the photographer
async function displayMediaData(media,photographer) {
  const mediaSection = document.querySelector(".media_section");
  media.forEach((media, index) => {
    const mediaModel = mediaFactory(media,photographer);
    const mediaCardDOM = mediaModel.getMediaCardDOM(index);
    mediaSection.appendChild(mediaCardDOM);
  });
  totalLikes();
}

function addLikes(index){
  const media = JSON.parse(localStorage.getItem("medias"));
  let result = media[index].likes + 1;
  const photo = document.getElementById(`${media[index].id}`);
  media[index].likes = result;
  localStorage.setItem("medias",JSON.stringify(media));
  photo.querySelector(".likeNbr").textContent = result;
  totalLikes();
  return(media[index].likes);
}
//get the like from the object and add the to the total count
function totalLikes(){
  const media = JSON.parse(localStorage.getItem("medias"));
  let totalLikes = 0;
  media.forEach((media) => {totalLikes = totalLikes += media.likes})
  //display total count of likes
  document.getElementById("totalLikes").textContent = totalLikes; 
}
//sorting
function sortBy(type){
  //get the data from the browser
  const media = JSON.parse(localStorage.getItem("medias"));
  const photographer = localStorage.getItem("photographer");
  const mediaSection = document.querySelector(".media_section");
  let mediaSorted;
  //wipe all the HTML
  mediaSection.replaceChildren();
  //sort by type
  if (type === "popularity"){
    //console.log(media);
    mediaSorted = media.sort((a, b) => 
    (a.likes < b.likes) ? 1 : (a.likes > b.likes) ? -1 : 0);  
  }
  if (type === "date") {
    mediaSorted = media.sort((a, b) => 
    (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0); 
  }
  if (type === "title"){
    mediaSorted = media.sort((a, b) => 
    (b.title < a.title) ? 1 : (b.title > a.title) ? -1 : 0); 
  }
  //save the new order
  localStorage.setItem("medias",JSON.stringify(mediaSorted));
  displayMediaData(mediaSorted,photographer);
}

//lightbox functions
function openLightbox(index) {
  //open lightbox
  const lightbox = document.querySelector("#lightbox");
  //console.log(lightbox);
  lightbox.style.display = "block";
  //get the right media with the index given by the display function
  const media = JSON.parse(localStorage.getItem("medias"))
  const photographer = localStorage.getItem("photographer");
  const mediaLightBox = media[index];
  //save the index
  localStorage.setItem("currentIndex",index);
  // clean the lightbox then display the right media with the right title
  lightbox.replaceChildren();
  const lbModel = LBFactory(mediaLightBox,photographer);
  const lbCardDOM = lbModel.getLBCardDOM();
  lightbox.appendChild(lbCardDOM);
  //Left and Right navigation
  document.onkeydown = function(e){
    switch(e.code){
      case 'ArrowLeft':
        previous();
        break;
      case 'ArrowRight':
        next();
        break;
    }
  }
}
//lightbox right arrow
function next(){
  let nextPhoto = parseInt(localStorage.getItem('currentIndex')) + 1;
  localStorage.setItem("currentIndex",nextPhoto);
  const media = JSON.parse(localStorage.getItem('medias'));
  if (nextPhoto >= media.length){
    nextPhoto = 0;
  }
  openLightbox(nextPhoto);
}
//lightbox left arrow
function previous(){
  let previousPhoto = parseInt(localStorage.getItem('currentIndex')) - 1;
  localStorage.setItem("currentIndex",previousPhoto);
  const medias = JSON.parse(localStorage.getItem('medias'));
  if (previousPhoto < 0){
    previousPhoto = medias.length - 1;
  }
  openLightbox(previousPhoto);
}

function closeLightbox() {
  const lightbox = document.querySelector("#lightbox");
  lightbox.style.display = "none";
}

getPhotographersId();
 
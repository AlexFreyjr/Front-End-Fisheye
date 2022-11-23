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
    localStorage.setItem("photographer",JSON.stringify(photographerSorted));
    displayPhotographersaData(photographerSorted);
    const mediaSorted = media.filter((photos) => photos.photographerId == photographer_id);
    localStorage.setItem("medias",JSON.stringify(mediaSorted));
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
    fees = photographer.price;
  });
  feesHTML.textContent = `${fees}€ / jour`;  
}

//call the factory to display photos of the photographer
async function displayMediaData(media,photographer) {
  const mediaSection = document.querySelector(".media_section");
  //let likes = [];
  let totalLikes = 0; 
  photographer = photographer[0].name;
  photographer = photographer.split(' ');
  localStorage.setItem("photographer",photographer[0]);
  media.forEach((media, index) => {
    const mediaModel = mediaFactory(media,photographer[0]);
    const mediaCardDOM = mediaModel.getMediaCardDOM(index);
    mediaSection.appendChild(mediaCardDOM);
    //likes.push(media.likes);
    totalLikes = totalLikes += media.likes;
  });
  document.querySelector(".totalLikes").textContent = totalLikes;
  //document.querySelector(".likeNbr").textContent = addLike(likes,index);
}
// function addLike(likes,index){
//   let result;
//   document.querySelector(".heart").addEventListener((e) => {
//     result = likes[index] += 1
//   });
//   return(result)
// }
//sorting
function sortBy(type){
  console.log("sort");
  const media = JSON.parse(localStorage.getItem("medias"));
  const photographer = localStorage.getItem("photographer");
  const mediaSection = document.querySelector(".media_section");
  mediaSection.innerHTML = "";
  if (type === "popularity"){
    
  }
  if (type === "date") {

  }
  if (type === "title"){
    media.sort((a,b) => a - b);
  }
  displayMediaData(media,photographer);
}

//lightbox functions
function openLightbox(index) {
  //open lightbox
  const lightbox = document.querySelector("#lightbox");
  lightbox.style.display = "block";
  //get the right media with the index given by the display function
  const media = JSON.parse(localStorage.getItem("medias"))
  const photographer = localStorage.getItem("photographer");
  const mediaLightBox = media[index];
  localStorage.setItem("currentIndex",index);
  console.log(localStorage.getItem('currentIndex'));
  // clean the lightbox then display the right media with the right title
  lightbox.innerHTML = "";
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
 
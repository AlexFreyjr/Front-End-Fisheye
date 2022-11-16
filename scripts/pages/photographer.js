//Mettre le code JavaScript lié à la page photographer.html

function displayLightbox() {
    const lightbox = document.querySelector("#lightbox");
	lightbox.style.display = "block";
}

function closeLightbox() {
    const lightbox = document.querySelector("#lightbox");
    lightbox.style.display = "none";
}
function likeListener(){
    let allHeart = document.querySelectorAll(".heart");
    let likeNbr = document.querySelectorAll(".likeNbr");
    allHeart.forEach((e) => e.addEventListener("click", function (e){
        //select the number near
        //add 1
        //return the updated number
      }));
}

function likesCount(){
    let likeNbr = document.querySelectorAll(".likeNbr");
    let result = 0;
    likeNbr.forEach(e => {result = result + parseInt(e.innerHTML);}) 
    return(result); 
}

document.querySelector(".totalLikes").innerHTML = likesCount();
likeListener();

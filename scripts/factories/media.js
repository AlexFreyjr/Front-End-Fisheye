function mediaFactory(data, name) {
    //catch data
    const { id, image, video, likes, title } = data;
    //structure data for use in html
    const picture = `assets/images/Photos/${name}/${image}`;
    const videoImg = `assets/images/Photos/${name}/${video}`;

    function getMediaCardDOM(index) {
        const article = document.createElement( 'article' );
        article.setAttribute("class","card");
        article.setAttribute("id",`${id}`);
        //link
        const a = document.createElement('a');
        a.setAttribute("class","lightbox_link");
        a.setAttribute("onclick",`openLightbox(${index})`);
        a.setAttribute("href", "#");
        //image
        let imageOrVideo;
        if(video){
            imageOrVideo = document.createElement( 'video' );
            imageOrVideo.setAttribute("src", videoImg);
            imageOrVideo.setAttribute("alt"," ");
        }
        else {
            imageOrVideo = document.createElement( 'img' );
            imageOrVideo.setAttribute("src", picture);
            imageOrVideo.setAttribute("alt"," ");
        }
        //description
        const divDescription = document.createElement('div');
        divDescription.setAttribute("class","card_description");
        //title
        const p = document.createElement( 'p' );
        p.textContent = title;
        //like
        const divLike = document.createElement('div');
        divLike.setAttribute("class","like");    
        //like number
        const divLikeNbr = document.createElement('div');
        divLikeNbr.setAttribute("class","likeNbr");
        divLikeNbr.textContent = likes;   
        //heart
        const heart = document.createElement('img');
        heart.setAttribute("src","./assets/icons/heart.svg");
        heart.setAttribute("class","heart");
        heart.setAttribute("onclick",`addLikes(${index})`);
        heart.setAttribute("alt","");

        //article structure
        article.appendChild(a);
        a.appendChild(imageOrVideo);
        article.appendChild(divDescription);
        divDescription.appendChild(p);
        divDescription.appendChild(divLike);
        divLike.appendChild(divLikeNbr);
        divLike.appendChild(heart);

        return (article);
    }
    return { getMediaCardDOM }
}
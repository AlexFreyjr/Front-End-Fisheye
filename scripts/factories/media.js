function mediaFactory(data, name) {
    //catch data
    const { date, id, image, likes, price, title } = data;
    //structure data for use in html
    const picture = `assets/images/Photos/${name}/${image}`;

    function getMediaCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute("class","card");
        //link
        const a = document.createElement('a');
        a.setAttribute("class","lightbox_link");
        a.setAttribute("onclick","displayLightbox()");
        a.setAttribute("href", "#");
        //image
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt"," ");
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
        heart.setAttribute("alt","likes");

        
        //article structure
        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(divDescription);
        divDescription.appendChild(p);
        divDescription.appendChild(divLike);
        divLike.appendChild(divLikeNbr);
        divLike.appendChild(heart);
        return (article);
    }
    return { date, id, picture, likes, price, title, getMediaCardDOM }
}
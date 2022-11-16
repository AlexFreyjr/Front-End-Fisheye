function photographerFactory(data) {
    //catch data
    console.log(data);
    const { name, portrait, city, country, tagline, price} = data;
    //structure data for use in html
    const picture = `assets/photographers/${portrait}`;
    const location = `${city}, ${country}`;
    const blorb = tagline;
    const fees = `${price}€/jour`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        //image
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt"," ");
        //link
        const a = document.createElement('a');
        a.setAttribute("href","./photographer.html");
        //title
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        //description
        const divDescription = document.createElement('div');
        divDescription.setAttribute("class","description");
        //city
        const divLocation = document.createElement('div');
        divLocation.setAttribute("class","city");
        divLocation.textContent = location;       
        //blorb
        const divBlorb = document.createElement('div');
        divBlorb.setAttribute("class","blorb");
        divBlorb.textContent = blorb; 
        //fees
        const divFees = document.createElement('div');
        divFees.setAttribute("class","fees");
        divFees.textContent = fees; 
        
        //article structure
        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        a.appendChild(divDescription);
        divDescription.appendChild(divLocation);
        divDescription.appendChild(divBlorb);
        divDescription.appendChild(divFees);
        return (article);
    }
    return { name, picture, location, blorb, fees, getUserCardDOM }
}
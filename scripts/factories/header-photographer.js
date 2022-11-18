function headerFactory(data) {
    //catch data
    const { name, portrait, city, country, tagline, price} = data;
    //structure data for use in html
    const picture = `./assets/photographers/${portrait}`;
    const location = `${city}, ${country}`;
    const fees = `${price}€ . / jour`;

    function getheaderCardDOM() {
        //description
        const divDescription = document.createElement('div');
        divDescription.setAttribute("class","description");
        //title
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        //city
        const divLocation = document.createElement('div');
        divLocation.setAttribute("class","location");
        divLocation.textContent = location;       
        //tagline
        const divTagline = document.createElement('div');
        divTagline.setAttribute("class","tagline");
        divTagline.textContent = tagline;
        //button
        const btn = document.createElement('button');
        btn.setAttribute("class","contact_button");
        btn.setAttribute("onclick","displayModal()");
        btn.textContent = "Contactez moi";
        //image
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt"," ");
        
        //article structure
        document.querySelector(".photograph-header").appendChild(divDescription);
        divDescription.appendChild(h2);
        divDescription.appendChild(divLocation);
        divDescription.appendChild(divTagline);
        document.querySelector(".photograph-header").appendChild(btn);
        document.querySelector(".photograph-header").appendChild(img);
        return (divDescription);
    }
    return { name, picture, location, tagline, fees, getheaderCardDOM }
}
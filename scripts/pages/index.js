// async function getPhotographers() {

//     fetch('./data/photographers.json')
//         .then(response => {
//             //get the answers from the server to know if the fetch has happened correctly
//             //if not then display the error code
//             if (!response.ok){
//                 throw new Error("HTTP error" + response.status);
//             }
//             //return the json fetch by the server
//             return response.json();
//         })
//         //grab the json and modify it
//         .then(json => {
//             //get only the photographer part of the json
//             let dataPhotographers = json.photographers;
//             //return only destructered data to be use in the init() function
//             return ({photographers: [...dataPhotographers]})
//         })
//         //catch error if something goes wrong when modifying the json
//         .catch(function(){
//             this.dataError = true;
//         })
// }
async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  const photographers = [
    {
      name: "Ma data test",
      id: 1,
      city: "Paris",
      country: "France",
      tagline: "Ceci est ma data test",
      price: 400,
      portrait: "account.png",
    },
    {
      name: "Autre data test",
      id: 2,
      city: "Londres",
      country: "UK",
      tagline: "Ceci est ma data test 2",
      price: 500,
      portrait: "account.png",
    },
  ];
  // et bien retourner le tableau photographers seulement une fois
  return {
    photographers: [...photographers, ...photographers, ...photographers],
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  console.log(getPhotographers());
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();

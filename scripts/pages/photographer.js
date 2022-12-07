// Get data from JSON
async function getData () {
  return await fetch('./data/photographers.json').then((response) =>
    response.json()
  )
}
// Get ID from URL then call the photos with the same ID
async function getPhotographersId () {
  const searchParams = new URLSearchParams(window.location.search)
  const photographerId = searchParams.get('id')
  let photographer
  if (photographerId) {
    // get the media and the specific photographer
    const { media } = await getData()
    const { photographers } = await getData()
    // filter the photographer
    const photographerSorted = photographers.find(
      (a) => a.id === photographerId
    )
    // get their info for the header
    displayPhotographersaData(photographerSorted)
    // saving just their first name
    photographer = photographerSorted.name
    photographer = photographer.split(' ')
    localStorage.setItem('photographer', photographer)
    // filtering media by photographers
    const mediaSorted = media.filter(
      (photos) => photos.photographerId === photographerId
    )
    localStorage.setItem('medias', JSON.stringify(mediaSorted))
    displayMediaData(mediaSorted, photographer)
    sortBy('Popularité')
  } else {
    alert('Pas de media liés a ce photographe')
  }
}
// call the factory to display the photographer information in the header
async function displayPhotographersaData (photographer) {
  const header = document.querySelector('.photograph-header')
  const feesHTML = document.querySelector('.right')
  let fees
  photographer.forEach((photographer) => {
    /* eslint-disable-next-line */
    const headerModel = headerFactory(photographer)
    const userCardDOM = headerModel.getheaderCardDOM()
    header.appendChild(userCardDOM)
    fees = photographer.price
  })
  feesHTML.textContent = `${fees}€ / jour`
}

// call the factory to display photos of the photographer
async function displayMediaData (media, photographer) {
  const mediaSection = document.querySelector('.media_section')
  media.forEach((media, index) => {
    /* eslint-disable-next-line */
    const mediaModel = mediaFactory(media, photographer)
    const mediaCardDOM = mediaModel.getMediaCardDOM(index)
    mediaSection.appendChild(mediaCardDOM)
  })
  totalLikes()
}
/* eslint-disable-next-line */
function addLikes(index) {
  // getting the list of media
  const media = JSON.parse(localStorage.getItem('medias'))
  // get the untouched list of media
  const mediaBase = JSON.parse(localStorage.getItem('mediasBase'))
  // get the right photo by getting the id
  const photo = document.getElementById(`${media[index].id}`)
  let result = media[index].likes + 1
  // block adding more than one like
  console.log(media[index].likes)
  console.log(mediaBase[index].likes)
  if (result > mediaBase[index].likes + 1) {
    result = media[index].likes - 1
  }
  // replace the number of like by the result
  media[index].likes = result
  localStorage.setItem('medias', JSON.stringify(media))
  photo.querySelector('.likeNbr').textContent = result
  totalLikes()
  return media[index].likes
}

// get the like from the object and add the to the total count
function totalLikes () {
  const media = JSON.parse(localStorage.getItem('medias'))
  let totalLikes = 0
  media.forEach((media) => {
    totalLikes = totalLikes += media.likes
  })
  // display total count of likes
  document.getElementById('totalLikes').textContent = totalLikes
}

// sorting
function sortBy (type) {
  const menuSVG =
    "<img src='assets/icons/arrow-down.svg' width='18' height='17' alt='' />"
  // get the data from the browser
  const media = JSON.parse(localStorage.getItem('medias'))
  const photographer = localStorage.getItem('photographer')
  const mediaSection = document.querySelector('.media_section')
  let mediaSorted
  // wipe all the HTML
  mediaSection.replaceChildren()
  // sort by type
  if (type === 'Popularité') {
    mediaSorted = media.sort((a, b) =>
      a.likes < b.likes ? 1 : a.likes > b.likes ? -1 : 0
    )
  }
  if (type === 'Date') {
    mediaSorted = media.sort((a, b) =>
      a.date < b.date ? 1 : a.date > b.date ? -1 : 0
    )
  }
  if (type === 'Titre') {
    mediaSorted = media.sort((a, b) =>
      b.title < a.title ? 1 : b.title > a.title ? -1 : 0
    )
  }
  // save the new order
  localStorage.setItem('medias', JSON.stringify(mediaSorted))
  localStorage.setItem('mediasBase', JSON.stringify(mediaSorted))
  displayMediaData(mediaSorted, photographer)
  // display the type of filter
  document.querySelector('.dropbtn').innerHTML = type + menuSVG
}

// lightbox functions
function openLightbox (index) {
  // open lightbox
  const lightbox = document.querySelector('#lightbox')
  lightbox.style.display = 'block'
  // get the right media with the index given by the display function
  const media = JSON.parse(localStorage.getItem('medias'))
  const photographer = localStorage.getItem('photographer')
  const mediaLightBox = media[index]
  // save the index
  localStorage.setItem('currentIndex', index)
  // clean the lightbox then display the right media with the right title
  lightbox.replaceChildren()
  /* eslint-disable-next-line */
  const lbModel = LBFactory(mediaLightBox, photographer)
  const lbCardDOM = lbModel.getLBCardDOM()
  lightbox.appendChild(lbCardDOM)
  // Left and Right navigation
}

document.onkeydown = function (e) {
  const lightbox = document.querySelector('#lightbox')
  if (lightbox.style.display === 'block') {
    switch (e.code) {
      case 'ArrowLeft':
        previous()
        break
      case 'ArrowRight':
        next()
        break
      // add escape
      case 'Escape':
        closeLightbox()
        break
    }
  }
}

// lightbox right arrow
function next () {
  let nextPhoto = parseInt(localStorage.getItem('currentIndex')) + 1
  localStorage.setItem('currentIndex', nextPhoto)
  const media = JSON.parse(localStorage.getItem('medias'))
  if (nextPhoto >= media.length) {
    nextPhoto = 0
  }
  openLightbox(nextPhoto)
}
// lightbox left arrow
function previous () {
  let previousPhoto = parseInt(localStorage.getItem('currentIndex')) - 1
  localStorage.setItem('currentIndex', previousPhoto)
  const medias = JSON.parse(localStorage.getItem('medias'))
  if (previousPhoto < 0) {
    previousPhoto = medias.length - 1
  }
  openLightbox(previousPhoto)
}

function closeLightbox () {
  const lightbox = document.querySelector('#lightbox')
  lightbox.style.display = 'none'
}

getPhotographersId()

const modal = document.getElementById('contact_modal')
const fNameForm = document.getElementById('prenom')
const nameForm = document.getElementById('nom')
const mailForm = document.getElementById('email')
const messageForm = document.getElementById('message')

let fNameLog
let nameLog
let mailLog
let messageLog
/* eslint-disable-next-line */
function displayModal () {
  modal.style.display = 'block'
}
function closeModal () {
  modal.style.display = 'none'
}

fNameForm.addEventListener('change', (e) => {
  fNameLog = e.target.value
})
nameForm.addEventListener('change', (e) => {
  nameLog = e.target.value
})
mailForm.addEventListener('change', (e) => {
  mailLog = e.target.value
})
messageForm.addEventListener('change', (e) => {
  messageLog = e.target.value
})

modal.addEventListener('submit', (e) => {
  console.log(fNameLog)
  console.log(nameLog)
  console.log(mailLog)
  console.log(messageLog)
  e.preventDefault()
  closeModal()
})

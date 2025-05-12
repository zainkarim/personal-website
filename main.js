// JavaScript code to handle mobile menu toggle
const menuButton = document.getElementById('mobile-menu-button')
const menu = document.getElementById('nav-content')

menuButton.addEventListener('click', () => {
  if (
    menuButton.classList.contains('bi-three-dots') &&
    menu.style.display == 'none'
  ) {
    menu.style.display = 'block'
    menuButton.classList.remove('bi-three-dots')
    menuButton.classList.add('bi-x')
  } else {
    menu.style.display = 'none'
    menuButton.classList.remove('bi-x')
    menuButton.classList.add('bi-three-dots')
  }
})

function refreshMenuCSS () {
  if (window.innerWidth > 600) {
    menu.style.display = 'block'
    menuButton.classList.remove('bi-x')
    menuButton.classList.add('bi-three-dots')
  } else {
    menu.style.display = 'none'
  }
}

window.addEventListener('resize', refreshMenuCSS)

const accordionButton = document.getElementById('accordion-button')
const accordionLabel = document.getElementById('accordion-label')
const honorsList = document.getElementById('select-honors')
accordionButton.addEventListener('click', () => {
  if (honorsList.style.display == 'none') {
    honorsList.style.display = 'block'
    accordionLabel.innerHTML = '- Current Favorites'
  } else {
    honorsList.style.display = 'none'
    accordionLabel.innerHTML = '+ Current Favorites'
  }
})

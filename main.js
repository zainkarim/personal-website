// Ensure DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // JavaScript code to handle mobile menu toggle
  const menuButton = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('nav-content');

  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      if (
        menuButton.classList.contains('bi-three-dots') &&
        menu.style.display === 'none'
      ) {
        menu.style.display = 'block';
        menuButton.classList.remove('bi-three-dots');
        menuButton.classList.add('bi-x');
      } else {
        menu.style.display = 'none';
        menuButton.classList.remove('bi-x');
        menuButton.classList.add('bi-three-dots');
      }
    });

    function refreshMenuCSS() {
      if (window.innerWidth > 600) {
        menu.style.display = 'block';
        menuButton.classList.remove('bi-x');
        menuButton.classList.add('bi-three-dots');
      } else {
        menu.style.display = 'none';
      }
    }

    window.addEventListener('resize', refreshMenuCSS);
  } else {
    console.error("Menu button or menu not found.");
  }

  const accordionButton = document.getElementById('accordion-button');
  const accordionLabel = document.getElementById('accordion-label');
  const honorsList = document.getElementById('select-honors');

  if (accordionButton && accordionLabel && honorsList) {
    accordionButton.addEventListener('click', () => {
      if (honorsList.style.display === 'none') {
        honorsList.style.display = 'block';
        accordionLabel.innerHTML = '- Current Favorites';
      } else {
        honorsList.style.display = 'none';
        accordionLabel.innerHTML = '+ Current Favorites';
      }
    });
  } else {
    console.warn("Accordion elements not found.");
  }

  // Function to load a random image from a gallery
  async function setRandomImage(elementId, jsonPath, imagePath) {
    try {
      const response = await fetch(jsonPath);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const images = await response.json();
      if (images.length === 0) throw new Error('No images found in the gallery.');

      const randomIndex = Math.floor(Math.random() * images.length);
      const randomImage = images[randomIndex];
      const galleryImage = document.getElementById(elementId);

      if (galleryImage) {
        const timestamp = new Date().getTime();
        galleryImage.src = `${imagePath}/${randomImage}?t=${timestamp}`;
        console.log(`Updated image to: ${galleryImage.src}`);
      } else {
        console.warn(`Gallery image element with ID ${elementId} not found.`);
      }
    } catch (error) {
      console.error(`Error loading images from ${jsonPath}:`, error);
    }
  }

  // Call the function when the page loads for both galleries
  setRandomImage('random-gallery-image', 'art/gallery/images/gallery.json', 'art/gallery/images/medium');
  setRandomImage('random-nightcar-image', 'art/night-car/images/gallery.json', 'art/night-car/images/medium');
  setRandomImage('random-people-image', 'art/people/images/people.json', 'art/people/images/medium');
});

// JavaScript for Embedded Image Viewer with Captions and Bottom Arrows
let currentIndex = 0;
let images = [];

const embeddedImage = document.getElementById('embedded-image');
const imageCaption = document.getElementById('image-caption');

// Dynamically load images based on the current page
function loadImages(pageName) {
  fetch(`art/${pageName}/images/data.json`)
    .then((response) => response.json())
    .then((data) => {
      images = data;
      showImage(0);
    })
    .catch((error) => console.error(`Error loading images for ${pageName}:`, error));
}

// Show the image at the current index
function showImage(index) {
  currentIndex = (index + images.length) % images.length;
  embeddedImage.src = images[currentIndex].src;
  imageCaption.textContent = images[currentIndex].caption;
}

function nextImage() {
  showImage(currentIndex + 1);
}

function prevImage() {
  showImage(currentIndex - 1);
}

// Detect the current page and load corresponding images
const pageName = window.location.pathname.split('/').pop().replace('.html', '');
loadImages(pageName);

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') nextImage();
  if (event.key === 'ArrowLeft') prevImage();
});

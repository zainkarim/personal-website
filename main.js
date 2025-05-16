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
});

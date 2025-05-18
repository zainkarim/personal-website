// Ensure DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('nav-content');

  // Check if the device is mobile and inject the unified menu if needed
  function injectUnifiedMobileNav() {
    if (window.innerWidth <= 600 && !menu.dataset.mobileInjected) {
      const unifiedMobileNav = `
        <ul class="nav-links">
          <li><a href="index.html">HOME</a></li>
          <ul class="work-title-list">
            <li><a href="pixi-cli.html">pixi-cli</a></li>
            <li><a href="dallas-skybot.html">@dallas_skybot</a></li>
          </ul>
          <li><a href="photos.html">PHOTOS</a></li>
          <ul class="work-title-list">
            <li><a href="gallery.html">Selected Works</a></li>
            <li><a href="night-car.html">Night Car</a></li>
            <li><a href="people.html">People</a></li>
          </ul>
          <li><a href="about.html">ABOUT</a></li>
          <ul class="social-links">
            <ol class="work-title-list">
              <li><a href="https://www.instagram.com/zainkarim_/" target="_blank" class="instagram">Instagram</a></li>
              <li><a href="https://github.com/zainkarim" target="_blank">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/zainkarim/" target="_blank">LinkedIn</a></li>
              <li><a href="zain_karim_resume.pdf" target="_blank">Resume</a></li>
              <li><a href="mailto:zain@zainkarim.com" target="_blank">Mail</a></li>
            </ol>
          </ul>
        </ul>
      `;
      menu.innerHTML = unifiedMobileNav;
      menu.dataset.mobileInjected = "true"; // Mark as injected to prevent duplication
    }
  }

  // Toggle the visibility of the menu
  function toggleMenu() {
    if (menu.style.display === 'none' || !menu.style.display) {
      menu.style.display = 'block';
      menuButton.classList.remove('bi-three-dots');
      menuButton.classList.add('bi-x');
    } else {
      menu.style.display = 'none';
      menuButton.classList.remove('bi-x');
      menuButton.classList.add('bi-three-dots');
    }
  }

  // Event listener for the menu button
  if (menuButton && menu) {
    injectUnifiedMobileNav(); // Inject the unified menu on page load
    menuButton.addEventListener('click', toggleMenu);

    function refreshMenuCSS() {
      if (window.innerWidth > 600) {
        menu.style.display = 'block';
        menuButton.classList.remove('bi-x');
        menuButton.classList.add('bi-three-dots');
      } else {
        menu.style.display = 'none';
        injectUnifiedMobileNav(); // Re-inject if switching from desktop to mobile
      }
    }

    window.addEventListener('resize', refreshMenuCSS);
  } else {
    console.error("Menu button or menu not found.");
  }

  // Accordion toggle for "Current Favorites"
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

  // Load random images for galleries
  setRandomImage('random-gallery-image', 'art/gallery/images/gallery.json', 'art/gallery/images/medium');
  setRandomImage('random-nightcar-image', 'art/night-car/images/gallery.json', 'art/night-car/images/medium');
  setRandomImage('random-people-image', 'art/people/images/people.json', 'art/people/images/medium');

  // Image Viewer with Captions and Navigation Arrows
  let currentIndex = 0;
  let images = [];
  const embeddedImage = document.getElementById('embedded-image');
  const imageCaption = document.getElementById('image-caption');

  function showImage(index) {
    currentIndex = (index + images.length) % images.length;
    embeddedImage.src = images[currentIndex].src;
    imageCaption.textContent = images[currentIndex].caption;
  }

  function loadImages(pageName) {
    fetch(`art/${pageName}/images/data.json`)
      .then(response => response.json())
      .then(data => {
        images = data;
        showImage(0);
      })
      .catch(error => console.error(`Error loading images for ${pageName}:`, error));
  }

  // Global functions for image navigation
  window.nextImage = function () { showImage(currentIndex + 1); };
  window.prevImage = function () { showImage(currentIndex - 1); };

  const pageName = window.location.pathname.split('/').pop().replace('.html', '');
  loadImages(pageName);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') nextImage();
    if (event.key === 'ArrowLeft') prevImage();
  });
});

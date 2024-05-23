document.addEventListener('scroll', () => {
    const darkSection = document.getElementById('dark');
    const darkSectionTop = darkSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (darkSectionTop <= windowHeight) {
        document.body.style.backgroundColor = '#000'; // Change to black
        document.body.classList.add('inverted'); // Add the inverted class for text color
    } else {
        document.body.style.backgroundColor = '#fff'; // Change back to white or any initial color
        document.body.classList.remove('inverted'); // Remove the inverted class for text color
    }
});

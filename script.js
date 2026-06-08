// ----- Navbar -----
const menuBtn = document.querySelector(".menu-icon");
const closeMenu = document.querySelector(".close-icon");
const navLinks = document.querySelector(".nav-links");
const backdrop = document.querySelector(".backdrop");

menuBtn.addEventListener("click", () => {
    navLinks.style.left = 0;
    navLinks.style.opacity = 1;
    backdrop.classList.add("active");
});

closeMenu.addEventListener("click", () => {
    navLinks.style.left = "-200px";
    navLinks.style.opacity = 0;
    backdrop.classList.remove("active");
});

backdrop.addEventListener("click", () => {
    navLinks.style.left = "-200px";
    navLinks.style.opacity = 0;
    backdrop.classList.remove("active");
});


// ----- Gallery -----
const mainImages = document.querySelectorAll(".gallery .main-image img");
const thumbnails = document.querySelectorAll(".thumb-list div");

thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
        changeImage(index, mainImages, thumbnails);
    })
});

function changeImage(index, mainImages, thumbnails) {

    mainImages.forEach((image) => {
        image.classList.remove("active");
    });

    thumbnails.forEach((thumb) => {
        thumb.classList.remove("active");
    });

    mainImages[index].classList.add("active");
    thumbnails[index].classList.add("active");
};
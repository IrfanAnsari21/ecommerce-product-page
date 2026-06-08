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
const mainImages = document.querySelectorAll(".default .main-image img");
const thumbnails = document.querySelectorAll(".default .thumb-list div");

thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
        changeImage(index, mainImages, thumbnails);
    })
});

let currentIndex = 0;

function changeImage(index, mainImages, thumbnails) {

    mainImages.forEach((image) => {
        image.classList.remove("active");
    });

    thumbnails.forEach((thumb) => {
        thumb.classList.remove("active");
    });

    mainImages[index].classList.add("active");
    thumbnails[index].classList.add("active");

    currentIndex = index;
};


//----- Lightbox -----
const lightbox = document.querySelector(".lightbox");
const lightboxMainImages = document.querySelectorAll(".lightbox .main-image img");
const lightboxThumbnails = document.querySelectorAll(".lightbox .thumb-list div");
const closeIcon = document.querySelector(".lightbox .icon-close");
const prevIcon = document.querySelector(".lightbox .icon-prev");
const nextIcon = document.querySelector(".lightbox .icon-next");

lightboxThumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
        changeImage(index, lightboxMainImages, lightboxThumbnails);
    });
});

mainImages.forEach((image, index) => {
    image.addEventListener("click", () => {
        lightbox.classList.add("active");
        changeImage(index, lightboxMainImages, lightboxThumbnails);
    });
});

prevIcon.addEventListener("click", () => {
    if (currentIndex <= 0) {
        changeImage(mainImages.length - 1, lightboxMainImages, lightboxThumbnails);
    } else {
        changeImage(currentIndex - 1, lightboxMainImages, lightboxThumbnails);
    }
});

nextIcon.addEventListener("click", () => {
    if (currentIndex >= mainImages.length - 1) {
        changeImage(0, lightboxMainImages, lightboxThumbnails);
    } else {
        changeImage(currentIndex + 1, lightboxMainImages, lightboxThumbnails);
    }
});

closeIcon.addEventListener("click", () => {
    lightbox.classList.remove("active");
})
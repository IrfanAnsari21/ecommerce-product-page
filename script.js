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
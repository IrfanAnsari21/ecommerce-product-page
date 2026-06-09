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
});


// Cart
const countEL = document.querySelector(".count");
const minusBtn = document.querySelector(".minus-btn");
const plusBtn = document.querySelector(".plus-btn");
const cartIcon = document.querySelector(".cart-icon");
const cartCount = document.querySelector(".cart-count");
const cartContainer = document.querySelector(".cart-container");
const addToCartBtn = document.querySelector(".add-to-cart-btn");
const cartItems = document.querySelector(".cart-items");
const checkout = document.querySelector(".checkout");

let count = 0;
let totalQty = 0;

function updateCount(newCount) {
    count = newCount;
    countEL.textContent = count;
}

minusBtn.addEventListener("click", () => {
    if (count > 0) {
        updateCount(count - 1);
    }
});

plusBtn.addEventListener("click", () => {
    updateCount(count + 1);
});


cartIcon.addEventListener("click", () => {
    cartContainer.classList.toggle("active");
});

cartCount.addEventListener("click", () => {
    cartContainer.classList.toggle("active");
});


function updateTotalQty() {
    const cartItemsList = document.querySelectorAll(".cart-item");
    totalQty = 0;
    cartItemsList.forEach((item) => {
        totalQty += parseInt(item.dataset.quantity)
    });

    cartCount.textContent = totalQty;
}

function removeItemFromCart(cartItem) {
    cartItem.remove();
    updateTotalQty();

    if (cartItems.children.length === 1) {
        cartItems.classList.add("empty");
        checkout.classList.add("empty");
    }
}

function addItemToCart(name, price, imgSrc) {
    const totalPrice = price * count;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.dataset.quantity = count;
    cartItem.innerHTML = `
        <img class="product-img" src="${imgSrc}" alt="${name}"/>
        <div class="item-details">
            <div>${name}</div>
            <div>
                <p>
                    ${price.toFixed(2)} x ${count}
                    <span class="total-price">${totalPrice.toFixed(2)}</span>
                </p>
            </div>
        </div>
        <button class="delete-item">
            <img src="images/icon-delete.svg" alt=""/>
        </button>
    `

    cartItems.appendChild(cartItem);
    updateTotalQty();

    if (cartItems.classList.contains("empty")) {
        cartItems.classList.remove("empty");
        checkout.classList.remove("empty");
    }

    //Delete button to remove an item from cart
    const deleteBtn = cartItem.querySelector(".delete-item");
    deleteBtn.addEventListener("click", (e) => {
        const targetItem = e.target.closest(".cart-item");
        removeItemFromCart(targetItem);
    });
}

addToCartBtn.addEventListener("click", () => {
    if (count === 0) return;

    const productName = document.querySelector(".main .content .product-name").textContent;
    const productPriceEl = document.querySelector(".main .content .current-price");
    const productPrice = parseFloat(productPriceEl.textContent.replace("$", ""));
    const productImage = document.querySelector(".default.gallery .main-image img").getAttribute("src");

    addItemToCart(productName, productPrice, productImage);

    updateCount(0);
});
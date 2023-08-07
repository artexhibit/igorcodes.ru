//change header social icon color on hover
let socialItems = document.querySelectorAll(".socials__item");
let isHovered = false;

socialItems.forEach((item) => {
    item.addEventListener("mouseover", itemHoveredIn);
    item.addEventListener("mouseleave", itemHoveredOut);
});

function itemHoveredIn(event) {
    if (event.target.tagName == "LI" && !isHovered) {
        let image = event.target.querySelector("img");

        if (image.alt == "stackOverflow") {
            image.src = "./assets/images/header/stackOverflowHover.svg";
        } else if (image.alt == "telegram") {
            image.src = "./assets/images/header/telegramHover.svg";
        } else if (image.alt == "envelope") {
            image.src = "./assets/images/header/envelopeHover.svg";
        }
        isHovered = true;
    }
}

function itemHoveredOut(event) {
    let image = event.target.querySelector("img");
    let themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    let ending = themeMediaQuery.matches ? "Light" : "Dark";

    if (image.alt == "stackOverflow") {
        image.src = `./assets/images/header/stackOverflow${ending}.svg`;
    } else if (image.alt == "telegram") {
        image.src = `./assets/images/header/telegram${ending}.svg`;
    } else if (image.alt == "envelope") {
        image.src = `./assets/images/header/envelope${ending}.svg`;
    } else {
        image.src = `./assets/images/header/github${ending}.svg`;
    }
    isHovered = false;
}

//show menu and animate hamburger icon
let hamburger = document.querySelector(".hamburger");
let hamburgerTitle = document.querySelector(".hamburger__title");
let hamburgerBarsContainer = document.querySelector(".hamburger__bars-container");
let navMenu = document.querySelector(".header__nav-container");
let menuLinks = document.querySelectorAll(".menu__link");

hamburger.addEventListener("click", showMenu);

menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

function changeHamburgerTitle() {
    hamburgerTitle.classList.toggle("fade-out");

    setTimeout(() => {
        hamburgerTitle.textContent = navMenu.classList.contains("active") ? "Закрыть" : "Меню";
        hamburgerTitle.classList.toggle("fade-out");
    }, 250);
}

function showMenu() {
    hamburgerBarsContainer.classList.toggle("active");
    navMenu.classList.toggle("active");
    changeHamburgerTitle();
}

function closeMenu() {
    hamburgerBarsContainer.classList.toggle("active");
    navMenu.classList.toggle("active");
    changeHamburgerTitle();
}

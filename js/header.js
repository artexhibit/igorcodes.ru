//change header social icon color on hover
let socialItems = document.querySelectorAll(".socials__item");
let isHovered = false;

socialItems.forEach((item) => {
    item.addEventListener("mouseover", itemHoveredIn);
    item.addEventListener("mouseleave", itemHoveredOut);
});

function itemHoveredIn(event) {
    if (event.target.tagName == "A" && !isHovered) {
        let image = event.target.querySelector("img");

        if (image.alt !== "github") {
            image.src = `./assets/images/header/${image.alt}Hover.svg`;
        }
        isHovered = true;
    }
}

function itemHoveredOut(event) {
    let theme = localStorage.getItem("theme");
    let image = event.target.querySelector("img");
    let themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    let ending = "";

    if (theme === "light") {
        ending = "Dark";
    } else if (theme === "dark") {
        ending = "Light";
    } else {
        ending = themeMediaQuery.matches ? "Light" : "Dark";
    }
    image.src = `./assets/images/header/${image.alt}${ending}.svg`;
    isHovered = false;
}

//show menu and animate hamburger icon
let hamburger = document.querySelector(".hamburger");
let hamburgerTitle = document.querySelector(".hamburger__title");
let hamburgerBarsContainer = document.querySelector(".hamburger__bars-container");
let navMenu = document.querySelector(".header__nav-container");
let menuLinks = document.querySelectorAll(".menu__link");

menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

function changeHamburgerTitle() {
    hamburgerTitle.classList.toggle("fade-out");

    setTimeout(() => {
        setTextFor(hamburgerTitle, navMenu, "active", ["Close", "Menu"], ["Закрыть", "Меню"]);
        hamburgerTitle.classList.toggle("fade-out");
    }, 150);
}

function showMenu() {
    hamburgerBarsContainer.classList.toggle("active");
    navMenu.classList.toggle("active");
    changeHamburgerTitle();
}

function closeMenu() {
    hamburgerBarsContainer.classList.toggle("active");
    navMenu.classList.remove("active");
    changeHamburgerTitle();
}

//close menu when clicking somewhere outside and show it when clicking in its borders
window.addEventListener("click", clickOutsideMenu);

function clickOutsideMenu(event) {
    if (!humburgerClicked(event)) {
        if (navMenu.classList.contains("active")) {
            closeMenu();
        }
    } else {
        showMenu();
    }
}

function humburgerClicked(event) {
    return [...event.target.classList].shift().includes("hamburger");
}

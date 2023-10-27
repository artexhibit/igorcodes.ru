//change header social icon color on hover
const socialItems = document.querySelectorAll(".socials__item");
const hamburger = document.querySelector(".hamburger");
const hamburgerTitle = document.querySelector(".hamburger__title");
const hamburgerBarsContainer = document.querySelector(".hamburger__bars-container");
const navMenu = document.querySelector(".header__nav-container");
const menuLinks = document.querySelectorAll(".menu__link");
const mediaQuery = window.matchMedia("(min-width: 1024px)");
let isHovered = false;

socialItems.forEach((item) => {
    item.addEventListener("mouseover", itemHoveredIn);
    item.addEventListener("mouseleave", itemHoveredOut);
});
menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});
mediaQuery.addEventListener("change", toggleNavMenu);

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
    const theme = localStorage.getItem("theme");
    const image = event.target.querySelector("img");
    const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
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
function changeHamburgerTitle() {
    hamburgerTitle.classList.toggle("fade-out");

    setTimeout(() => {
        setTextFor(hamburgerTitle, navMenu, "active", ["Close", "Menu"], ["Закрыть", "Меню"]);
        hamburgerTitle.classList.toggle("fade-out");
    }, 150);
}

function handleMenu() {
    hamburgerBarsContainer.classList.toggle("active");
    navMenu.style.display = "flex";

    setTimeout(() => {
        navMenu.classList.toggle("active");

        if (!navMenu.classList.contains("active")) {
            setTimeout(() => {
                navMenu.style.display = "none";
            }, 100);
        }
    }, 1);
    changeHamburgerTitle();
}

function closeMenu() {
    hamburgerBarsContainer.classList.remove("active");
    navMenu.classList.remove("active");

    if (!mediaQuery.matches) {
        setTimeout(() => {
            navMenu.style.display = "none";
        }, 100); 
    }
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
        handleMenu();
    }
}

function humburgerClicked(event) {
    return [...event.target.classList].shift().includes("hamburger");
}

//hide or show navigation menu with links depending on screen size
function toggleNavMenu() {
    navMenu.style.display = mediaQuery.matches ? "flex" : "none";
}

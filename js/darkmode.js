let themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

function enableDarkMode() {
    document.body.classList.add("darkMode");
}

function disableDarkMode() {
    document.body.classList.remove("darkMode");
}

function setupTheme(event) {
    let theme = localStorage.getItem("theme");

    if (theme === "autoTheme") {
        event.matches ? enableDarkMode() : disableDarkMode();
        setupSocialIcons(event);
        setupResumeIcons(event);
    } else if (theme === "light") {
        disableDarkMode();
        setupSocialIcons(themeMediaQuery, "Dark");
        setupResumeIcons(themeMediaQuery, "Dark");
    } else if (theme === "dark") {
        enableDarkMode();
        setupSocialIcons(themeMediaQuery, "Light");
        setupResumeIcons(themeMediaQuery, "Light");
    }
}

//change social icons style displayed in header section
function setupSocialIcons(event, theme = "") {
    let allSocials = document.querySelector(".socials__list");
    let icons = allSocials.querySelectorAll("img");
    let ending = "";

    ending = theme === "" ? (event.matches ? "Light" : "Dark") : theme;

    icons.forEach((icon) => {
        icon.src = `./assets/images/header/${icon.alt}${ending}.svg`;
    });
}

function setupResumeIcons(event, theme = "") {
    let allIcons = document.querySelectorAll(".theme-sensitive");
    let ending = "";

    ending = theme === "" ? (event.matches ? "Light" : "Dark") : theme;

    allIcons.forEach((icon) => {
        if (icon.src.includes("header")) {
            icon.src = `./assets/images/resume/header/${icon.alt}${ending}.svg`;
        } else if (icon.src.includes("factsLeft")) {
            icon.src = `./assets/images/resume/factsLeft/${icon.alt}${ending}.svg`;
        } else if (icon.src.includes("factsRight")) {
            icon.src = `./assets/images/resume/factsRight/${icon.alt}${ending}.svg`;
        } else {
            icon.src = `./assets/images/resume/factsBig/${icon.alt}${ending}.svg`;
        }
    });
}

themeMediaQuery.addEventListener("change", setupTheme);
setupTheme(themeMediaQuery);

let themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

function enableDarkMode() {
    document.body.classList.add("darkMode");
    localStorage.setItem("darkMode", "enabled");
}

function disableDarkMode() {
    document.body.classList.remove("darkMode");
    localStorage.setItem("darkMode", null);
}

function setupTheme(event) {
    event.matches ? enableDarkMode() : disableDarkMode();
    setupSocialIcons(event);
}

function setupSocialIcons(event) {
    let allSocials = document.querySelector(".socials__list");
    let icons = allSocials.querySelectorAll("img");
    let ending = event.matches ? "Light" : "Dark";

    icons.forEach(icon => {
        icon.src = `./assets/images/header/${icon.alt}${ending}.svg`;
    });
}

themeMediaQuery.addEventListener("change", setupTheme);
setupTheme(themeMediaQuery);

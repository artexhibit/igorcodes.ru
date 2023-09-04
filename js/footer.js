//show settings view when button clicked and hide it when clicking or scrolling somewhere else
let settingsButton = document.querySelector(".settings__button");
let switchesView = document.querySelector(".footer__switches");

settingsButton.addEventListener("click", showSettingsSetup);
window.addEventListener("scroll", closeSettings);
window.addEventListener("click", checkClickOutside);

function checkClickOutside(event) {
    if (!event.target.closest(".settings__button") && !event.target.closest(".footer__switches")) {
        closeSettings();
    }
}

function showSettingsSetup() {
    showSettings();
    setupButtonTitle();
}

function showSettings() {
    switchesView.classList.toggle("active");
}

function closeSettings() {
    switchesView.classList.remove("active");
}

function setupButtonTitle() {
    settingsButton.classList.toggle("clicked");
}

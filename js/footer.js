//show settings view when button clicked and hide it when clicking or scrolling somewhere else
let settingsButton = document.querySelector(".settings__button");
let switchesView = document.querySelector(".footer__switches");
let settingsButtonMainIcon = document.querySelector(".settings__button-icon");
let settingsButtonCloseIcon = document.querySelector(".settings__button-icon--close");

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
    configureSettingsButton();
}

function showSettings() {
    switchesView.classList.toggle("active");
}

function closeSettings() {
    switchesView.classList.remove("active");
}

//perform icons animation and title changing on button click
function configureSettingsButton() {
    settingsButton.classList.toggle("clicked");

    if (settingsButton.classList.contains("clicked")) {
        settingsButtonMainIcon.style.animation = 'hideIcon 0.3s ease-in-out forwards';
        settingsButtonCloseIcon.style.animation = 'showIcon 0.4s ease-in-out forwards';
    } else {
        settingsButtonCloseIcon.style.animation = 'hideIconReverse 0.3s ease-in-out forwards';
        settingsButtonMainIcon.style.animation = 'showIconReverse 0.4s ease-in-out forwards';
    }
}

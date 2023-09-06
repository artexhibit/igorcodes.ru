let settingsButton = document.querySelector(".settings__button");
let switchesView = document.querySelector(".footer__switches");
let themeSwitch = document.querySelector(".footer__switch-theme");
let languageSwitch = document.querySelector(".footer__switch-lang");
let switchContainers = document.querySelectorAll(".switch");
let settingsButtonMainIcon = document.querySelector(".settings__button-icon");
let settingsButtonCloseIcon = document.querySelector(".settings__button-icon--close");
let allSwitchButtons = [...switchesView.querySelectorAll(".switch__button")];

settingsButton.addEventListener("click", showSettingsSetup);
window.addEventListener("scroll", closeSettings);
window.addEventListener("click", checkClickOutside);

allSwitchButtons.forEach((button) => {
    button.addEventListener("click", performActionsWithClickedButton);
});

window.addEventListener("load", function () {
    setInitialSwitchValues();
    setupPickedButtons();
});


//on a first page load if there is no saved options set the default ones
function setInitialSwitchValues() {
    switchContainers.forEach((switchContainer) => {
        let item = switchContainer.id === "theme" ? "autoTheme" : "autoLang";

        if (!localStorage.getItem(`${switchContainer.id}`)) {
            localStorage.setItem(`${switchContainer.id}`, `${item}`);
        }
    });
}

//on a first page load move slider according to saved user options from settings
function setupPickedButtons() {
    let savedSettings = [localStorage.getItem("theme"), localStorage.getItem("lang")];

    savedSettings.forEach((setting) => {
        allSwitchButtons.forEach((button) => {
            if (button.id === setting) {
                moveSlider(button, false);
            }
        });
    });
}

function performActionsWithClickedButton(event) {
    moveSlider(event.currentTarget);
    savePickedButtonState(event.currentTarget);
    setupTheme(themeMediaQuery);
}

//save picked option to local storage
function savePickedButtonState(pickedButton) {
    let item = pickedButton.parentNode.id === "theme" ? "theme" : "lang";
    localStorage.setItem(`${item}`, `${pickedButton.id}`);
}

//move slider according to clicked button and on page first load move it without animation
function moveSlider(pickedButton, withAnimation = true) {
    let slider = pickedButton.parentNode.lastElementChild;
    slider.style.width = `calc(${pickedButton.offsetWidth}px - 6px)`;
    slider.style.left = `calc(${pickedButton.offsetLeft}px + 3px)`;

    if (!withAnimation) {
        slider.style.transition = "none";

        setTimeout(() => {
            slider.style.transition = "left 0.35s ease, width 0.3s ease";
        }, 50);
    }
}

//show settings view when button clicked and hide it when clicking or scrolling somewhere else
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
    if (switchesView.classList.contains("active")) {
        configureSettingsButton();
    }
    switchesView.classList.remove("active");
}

//perform icons animation and title changing on button click
function configureSettingsButton() {
    settingsButton.classList.toggle("clicked");

    if (settingsButton.classList.contains("clicked")) {
        settingsButtonMainIcon.style.animation = "hideIcon 0.3s ease-in-out forwards";
        settingsButtonCloseIcon.style.animation = "showIcon 0.4s ease-in-out forwards";
    } else {
        settingsButtonCloseIcon.style.animation = "hideIconReverse 0.3s ease-in-out forwards";
        settingsButtonMainIcon.style.animation = "showIconReverse 0.4s ease-in-out forwards";
    }
}

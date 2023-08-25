//make clicked tab active
let tabs = [...document.querySelectorAll(".tab")];
let slider = document.querySelector(".projects__tabs-slider");
let container = document.querySelector(".projects__tabs-container");
let expandButtons = document.querySelectorAll(".card__button");
let defaultTab = tabs[0];

tabs.forEach((tab) => {
    tab.addEventListener("click", tabClicked);
});

expandButtons.forEach((button) => {
    button.addEventListener("click", expandButtonClicked);
});

function tabClicked(event) {
    event.preventDefault();

    tabs.forEach((tab) => {
        tab.classList.remove("active");
    });
    event.currentTarget.classList.add("active");

    //scroll tab to center if it's not fully visible on sm screen width;
    if (window.innerWidth <= 640) {
        let scrollOptions = { behavior: "smooth", inline: "center" };
        let containerRect = container.getBoundingClientRect();
        let tabRect = event.currentTarget.getBoundingClientRect();
        let margin = 15;

        let scrollLeft = container.scrollLeft + tabRect.left - containerRect.left - margin;
        container.scrollTo({ left: scrollLeft, ...scrollOptions });
    }

    //set slider width according to a picked tab width and move it underneath it
    configureSlider(event.currentTarget.querySelector("a"));
    showCards(event.currentTarget);
}

function configureSlider(pickedTab) {
    slider.style.width = `${pickedTab.offsetWidth}px`;
    slider.style.transform = `translateX(${pickedTab.offsetLeft}px)`;
}

//when screen size is md and down slider is hided. If screen goes up and slider is unhided - recalculate it's position.
window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) {
        let pickedTab = document.querySelector(".active").querySelector("a");
        configureSlider(pickedTab);
        slider.style.transition = "none";

        setTimeout(function () {
            slider.style.transition = "transform 0.35s ease, width 0.3s ease";
        }, 10);
    }
});

// set default slider width and position on page load
window.addEventListener("load", function () {
    let pickedTab = document.querySelector(".active").querySelector("a");
    configureSlider(pickedTab);
});

//when expand button clicked we achange it's text, animate chevron and set a card containers a new height to display a long subtitle text. Change everything back if expand button pressed again

function expandButtonClicked(event) {
    let pressedButton = event.currentTarget;
    let subtitleContainer = pressedButton.parentElement.parentElement.firstElementChild;
    let buttonContainer = pressedButton.parentElement.parentElement.firstElementChild.parentElement;
    let buttonWrapper = pressedButton.parentElement;
    let pressedButtonChevron = pressedButton.querySelector("img");
    let textContent = pressedButton.parentElement.parentElement.firstElementChild.querySelector("p");

    buttonWrapper.classList.toggle("opened");
    pressedButtonChevron.classList.toggle("opened");

    if (buttonWrapper.classList.contains("opened")) {
        subtitleContainer.style.height = `${textContent.offsetHeight}px`;
        buttonContainer.style.height = `calc(${textContent.offsetHeight}px + 10px)`;
        buttonContainer.style.marginBottom = "60px";
        pressedButton.querySelector("p").textContent = "Свернуть";

        setTimeout(() => {
            subtitleContainer.style.maskImage = "none";
        }, 450);
    } else {
        pressedButton.querySelector("p").textContent = "Раскрыть";
        subtitleContainer.style.maskImage = "linear-gradient(180deg, #000 60%, transparent)";
        subtitleContainer.style.height = "60px";
        buttonContainer.style.height = "70px";
        buttonContainer.style.marginBottom = "40px";
    }
}

//if js disabled, then show full cards subtitle text without expand button and a shadow, otherwise user won't expand subtitle text

function setupCard() {
    let cardSubtitleContainers = document.querySelectorAll(".card__subtitle-container");

    cardSubtitleContainers.forEach((subtitleContainer) => {
        let buttonContainer = subtitleContainer.parentElement;
        let subtitle = subtitleContainer.firstElementChild;
        let expandButtonContainer = subtitleContainer.parentElement.querySelector(".card__button-wrapper");

        if (subtitle.offsetHeight >= 60) {
            subtitleContainer.style.height = "60px";
            subtitleContainer.style.transition = "none";
            subtitleContainer.style.maskImage = "linear-gradient(180deg, #000 60%, transparent)";
            buttonContainer.style.height = "70px";
            buttonContainer.style.transition = "none";
            expandButtonContainer.classList.add("visible");

            setTimeout(() => {
                buttonContainer.style.transition = "height 0.8s ease, margin-bottom 0.8s ease";
                subtitleContainer.style.transition = "height 0.6s ease-in-out";
            }, 10);
        }
    });
}

function showCards(event) {
    let cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        card.style.display = card.classList.contains(`${event.id}`) ? "flex" : "none";
    });
}

setupCard();
showCards(defaultTab);

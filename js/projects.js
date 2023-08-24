//make clicked tab active
let tabs = [...document.querySelectorAll(".tab")];
let slider = document.querySelector(".projects__tabs-slider");
let container = document.querySelector(".projects__tabs-container");
let expandButtons = document.querySelectorAll(".card__button");

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
        pressedButton.querySelector("p").textContent = "Свернуть";

        setTimeout(() => {
            subtitleContainer.style.maskImage = "none";
        }, 500);
    } else {
        pressedButton.querySelector("p").textContent = "Раскрыть";
        subtitleContainer.style.maskImage = "linear-gradient(180deg, #000 60%, transparent)";
        subtitleContainer.style.height = "60px";
        buttonContainer.style.height = "70px";
    }
}

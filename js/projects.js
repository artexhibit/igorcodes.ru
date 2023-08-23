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
    let subtitleContainer = event.currentTarget.parentElement.parentElement.firstElementChild;
    let buttonContainer = event.currentTarget.parentElement.parentElement.firstElementChild.parentElement;
    let buttonWrapper = event.currentTarget.parentElement;
    let pressedButton = event.currentTarget;
    let pressedButtonChevron = pressedButton.querySelector("img");

    buttonWrapper.classList.toggle("opened");
    pressedButtonChevron.classList.toggle("opened");
    subtitleContainer.classList.toggle("active");
    buttonContainer.classList.toggle("active");

    if (buttonWrapper.classList.contains("opened")) {
        pressedButton.querySelector("p").textContent = "Свернуть";
    } else {
        pressedButton.querySelector("p").textContent = "Раскрыть";
    }
}

//make clicked tab active
let tabs = [...document.querySelectorAll(".tab")];
let slider = document.querySelector(".projects__tabs-slider");
let tabsContainer = document.querySelector(".projects__tabs-container");
let cardsContainer = document.querySelector(".projects__cards");
let expandButtons = document.querySelectorAll(".card__button");
let cards = document.querySelectorAll(".card");
let defaultTab = tabs[0];
let pickedTab = document.querySelector(".active").querySelector("a");
let projectsMenuLink = document.getElementById("link1");
let projectsMenuLinkClicked = false;

tabs.forEach((tab) => {
    tab.addEventListener("click", tabClicked);
});

//if menu nav link "projects" was clicked, then set new cards animation, because built-in scrolling speed too fast
projectsMenuLink.addEventListener("click", function () {
    projectsMenuLinkClicked = true;
});

expandButtons.forEach((button) => {
    button.addEventListener("click", expandButtonClicked);
});

// set default slider width and position on page load
window.addEventListener("load", function () {
    configureSlider(pickedTab);
    addMarginToCardsContainer();
});
setupCard();

function tabClicked(event) {
    event.preventDefault();

    tabs.forEach((tab) => {
        tab.classList.remove("active");
    });
    event.currentTarget.classList.add("active");

    //scroll tab to center if it's not fully visible on sm screen width;
    if (window.innerWidth <= 640) {
        let scrollOptions = { behavior: "smooth", inline: "center" };
        let containerRect = tabsContainer.getBoundingClientRect();
        let tabRect = event.currentTarget.getBoundingClientRect();
        let margin = 15;

        let scrollLeft = tabsContainer.scrollLeft + tabRect.left - containerRect.left - margin;
        tabsContainer.scrollTo({ left: scrollLeft, ...scrollOptions });
    }

    //set slider width according to a picked tab width and move it underneath it
    configureSlider(event.currentTarget.querySelector("a"));
    showCards(event.currentTarget);
    setCardsSwitchAnimation();

    setTimeout(function () {
        addMarginToCardsContainer();
    }, 50);
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

//when expand button clicked we achange it's text, animate chevron and set a card containers a new height to display a long subtitle text. Change everything back if expand button pressed again
function expandButtonClicked(event) {
    let pressedButton = event.currentTarget;
    let subtitleContainer = pressedButton.parentElement.parentElement.firstElementChild;
    let buttonContainer = pressedButton.parentElement.parentElement.firstElementChild.parentElement;
    let buttonWrapper = pressedButton.parentElement;
    let pressedButtonChevron = pressedButton.querySelector("img");
    let textContent = pressedButton.parentElement.parentElement.firstElementChild.querySelector("p");
    let cardContainer = buttonContainer.parentElement;
    let card = cardContainer.parentElement;

    buttonWrapper.classList.toggle("opened");
    pressedButtonChevron.classList.toggle("opened");
    setTextFor(pressedButton.querySelector("p"), buttonWrapper, "opened", ["Hide", "Expand"], ["Свернуть", "Раскрыть"]);

    if (buttonWrapper.classList.contains("opened")) {
        subtitleContainer.style.height = `${textContent.offsetHeight}px`;
        buttonContainer.style.height = `calc(${textContent.offsetHeight}px + 10px)`;
        buttonContainer.style.marginBottom = "60px";
        card.classList.add("expanded");

        animateIn([cardContainer, card], cardContainer, textContent, buttonContainer);
        animateMarginFor(card);

        setTimeout(() => {
            cardContainer.style.height = cardContainer.offsetHeight + "px";
            card.style.height = card.offsetHeight + 24 + "px";
        }, 750);

        setTimeout(() => {
            subtitleContainer.style.maskImage = "none";
            subtitleContainer.style.webkitMaskImage = "none";
        }, 450);

        cards.forEach((card) => {
            if (!card.classList.contains("animateOut") && !card.classList.contains("expanded")) {
                card.style.height = card.offsetHeight + "px";
            }
        });
    } else {
        subtitleContainer.style.height = "60px";
        buttonContainer.style.height = "70px";
        buttonContainer.style.marginBottom = "40px";
        card.classList.remove("expanded");

        animateOut([cardContainer, card], cardContainer, subtitleContainer);
        animateMarginFor(card);

        setTimeout(() => {
            cardContainer.style.height = cardContainer.offsetHeight + "px";
            card.style.height = card.offsetHeight + 24 + "px";
        }, 790);

        setTimeout(() => {
            subtitleContainer.style.maskImage = "linear-gradient(180deg, #000 60%, transparent)";
            subtitleContainer.style.webkitMaskImage = "linear-gradient(180deg, #000 60%, transparent)";
        }, 200);
    }

    setTimeout(function () {
        addMarginToCardsContainer();
    }, 50);
}

//animate card new height when expand button pressed
function animateIn(items, cardC, textC, buttonC) {
    items.forEach((item) => {
        item.animate([{ height: item.offsetHeight + "px" }, { height: cardC.offsetHeight + textC.offsetHeight + buttonC.offsetHeight - 100 + "px" }], { duration: 800, easing: "ease" });
    });
}

//animate card collapse of height when expand button pressed again
function animateOut(items, cardC, subC) {
    items.forEach((item) => {
        item.animate([{ height: item.offsetHeight + "px" }, { height: cardC.offsetHeight - subC.offsetHeight + 30 + "px" }], { duration: 800, easing: "ease" });
    });
}

//simulate margin addition to card so when card is expanded and there is more than 1 row cards in column be separated from each other
function animateMarginFor(card) {
    card.animate([{ marginBottom: "0px" }, { marginBottom: "24px" }], { duration: 800, easing: "ease" });
}

//On page initial loading no need to trigger switch animation, just when tab is clicked
function setCardsSwitchAnimation() {
    cards.forEach((card) => {
        card.style.animationDuration = "1.5s";
    });
}

//Add margin to container to avoid cases with a different heights because of difference in rows between categories. If there is a switch from 2 rows into 1 - then there was a layout jump
function addMarginToCardsContainer() {
    let shownCards = Array.from(cards).filter((card) => !card.classList.contains("animateOut"));
    cardsContainer.style.marginBottom = shownCards.length <= 3 ? "472px" : "";
}

//if js disabled, then show full cards subtitle text without expand button and a shadow, otherwise user can't expand and see subtitle text
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

//animations for title, tabs and cards when page loads and they became visible on the screen
function animateSection() {
    let projectsTitle = document.querySelector(".projects__topic");
    let projectsTabs = document.querySelector(".projects__tabs");
    let projectsCards = document.querySelector(".projects__cards");
    let itemsToAnimate = [projectsTitle, projectsTabs].concat([...projectsCards.children]);

    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains("projects__cards")) {
                    [...projectsCards.children].forEach((card) => {
                        card.classList.add("shownCard");
                        card.classList.remove("hiddenCard");

                        if (projectsMenuLinkClicked) {
                            card.style.transition = "all 0.5s ease-in-out";
                        }
                    });
                } else {
                    entry.target.classList.add("shownNavigation");
                    entry.target.classList.remove("hiddenNavigation");
                }
            }
        });
    });

    itemsToAnimate.forEach((item, index) => {
        let itemType = item.classList.contains("card") ? "Card" : "Navigation";

        if (!item.classList.contains("card")) {
            observer.observe(item);
        }

        if (index != 2) {
            item.style.transitionDelay = `${index * 0.1}s`;
        }
        item.classList.add(`hidden${itemType}`);
    });
    observer.observe(projectsCards);
}
animateSection();

// card animation when switching between tabs
function showCards(event) {
    cards.forEach((card) => {
        if (!card.classList.contains(`${event.id}`)) {
            card.classList.add("animateOut");
        } else {
            card.classList.remove("animateOut");
        }
    });

    setTimeout(() => {
        cards.forEach((card) => {
            if (card.classList.contains("animateOut")) {
                card.style.display = "none";
            } else {
                card.style.display = "flex";
                card.classList.add("animateIn");
            }
        });
    }, 50);
}
showCards(defaultTab);

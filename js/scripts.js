//change header social icon color on hover
let socialItems = document.querySelectorAll(".socials__item");
let isHovered = false;

socialItems.forEach((item) => {
    item.addEventListener("mouseover", itemHoveredIn);
    item.addEventListener("mouseleave", itemHoveredOut);
});

function itemHoveredIn(event) {
    if (event.target.tagName == "LI" && !isHovered) {
        let image = event.target.querySelector("img");

        if (image.alt == "stackOverflow") {
            image.src = "./assets/images/header/stackOverflowHover.svg";
        } else if (image.alt == "telegram") {
            image.src = "./assets/images/header/telegramHover.svg";
        } else if (image.alt == "envelope") {
            image.src = "./assets/images/header/envelopeHover.svg";
        }
        isHovered = true;
    }
}

function itemHoveredOut(event) {
    let image = event.target.querySelector("img");

        if (image.alt == "stackOverflow") {
            image.src = "./assets/images/header/stackOverflowDark.svg";
        } else if (image.alt == "telegram") {
            image.src = "./assets/images/header/telegramDark.svg";
        } else if (image.alt == "envelope") {
            image.src = "./assets/images/header/envelopeDark.svg";
        }
    isHovered = false;
}

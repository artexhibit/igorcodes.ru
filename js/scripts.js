//change header social icon color on hover
let socialItems = document.querySelectorAll(".socials__item");

socialItems.forEach((item) => {
    item.addEventListener("mouseover", itemHoveredIn);
    item.addEventListener("mouseout", itemHoveredOut);
});

function itemHoveredIn(event) {
    if (event.target.tagName == "LI") {
        console.log(event.target);
    }
}

function itemHoveredOut(event) {}

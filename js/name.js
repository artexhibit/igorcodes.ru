//make equal width if switch on portrait orientation
let container = [...document.querySelectorAll(".container")][1];
window.addEventListener("resize", handleOrientation);

function handleOrientation() {
    let windowNewHeight = window.innerHeight;

    let section = document.querySelector(".name");
    let wrapper = container.querySelector(".wrapper");
    let image = container.querySelector(".name__image");
    let title = container.querySelector(".name__title");
    let subtitle = container.querySelector(".name__subtitle");

    if (windowNewHeight <= 536) {
        wrapper.style.maxWidth = 400 + "px";
        image.style.width = 218.5 + "px";
        title.style.fontSize = 1.93 + "rem";
        subtitle.style.fontSize = 1.16 + "rem";
       // section.style.height = 110 + '%';
    } else {
        wrapper.style.maxWidth = "";
        image.style.width = "";
        title.style.fontSize = "";
        subtitle.style.fontSize = "";
       // section.style.height = 100 + '%';
    }
}
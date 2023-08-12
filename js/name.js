//make equal width if switch on portrait orientation
let containers = [...document.querySelectorAll(".container")].slice(1);
window.matchMedia("(orientation: portrait)").addEventListener("change", handleOrientation);

function handleOrientation(event) {
    let portrait = event.matches;
    
    containers.forEach((container) => {
        let wrapper = container.querySelector(".wrapper");
        let title = container.querySelector(".name__title");
        let subtitle = container.querySelector(".name__subtitle");
        let titleFontSize = (wrapper.offsetWidth * 4) / 1000;
        let subtitleFontSize = (wrapper.offsetWidth * 2) / 1000;

        if (!portrait && window.innerWidth <= 736) {
            wrapper.style.maxWidth = "50%";
            title.style.fontSize = titleFontSize + "rem";
            subtitle.style.fontSize = subtitleFontSize + "rem";
        } else {
            wrapper.style.maxWidth = "";
            title.style.fontSize = "";
            subtitle.style.fontSize = "";
        }
    });
}
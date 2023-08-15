//make clicked tab active
let tabs = [...document.querySelectorAll(".tab")];
tabs.forEach((tab) => {
    tab.addEventListener("click", tabClicked);
});

function tabClicked(event) {
    event.preventDefault();

    tabs.forEach((tab) => {
        tab.classList.remove("active");
    });
    event.currentTarget.classList.add("active");

    //scroll tab to center if it's not fully visible on esm screen width;
    if (window.innerWidth <= 320) {
        event.currentTarget.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
}

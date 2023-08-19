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

    //scroll tab to center if it's not fully visible on sm screen width;
    if (window.innerWidth <= 640) {
        let scrollOptions = { behavior: "smooth", inline: "center" };
        let container = document.querySelector(".projects__tabs-container");
        let containerRect = container.getBoundingClientRect();
        let tabRect = event.currentTarget.getBoundingClientRect();

        let scrollLeft = container.scrollLeft + tabRect.left - containerRect.left;
        container.scrollTo({ left: scrollLeft, ...scrollOptions });
    }
}

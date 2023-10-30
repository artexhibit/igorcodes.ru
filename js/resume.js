function setDefaultResume() {
    const activeResume = localStorage.getItem("shownResume");

    if (!activeResume) {
        localStorage.setItem("shownResume", "SWIFT");
    } else {
        setActiveResume(activeResume);
    }
}

function setActiveResume(resumeName) {
    const swiftResume = document.querySelector(".resume");
    const frontResume = document.querySelector(".resume__front");

    localStorage.setItem("shownResume", resumeName);

    swiftResume.id = resumeName === "FRONT" ? "hidden" : "";
    frontResume.id = resumeName === "FRONT" ? "" : "hidden";
}
setDefaultResume();

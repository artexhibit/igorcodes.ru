const captchaButton = document.querySelector(".captcha__button-refresh");
const downloadButton = document.querySelector(".resume__downloader-button");
const captchaContainer = document.querySelector(".resume__dowloader-captcha--container");

captchaButton.addEventListener("click", refreshButtonClicked);
downloadButton.addEventListener("click", downloadButtonClicked);

function refreshButtonClicked() {
    captchaButton.classList.add("clicked");

    setTimeout(function () {
        captchaButton.classList.remove("clicked");
    }, 500);
}

function downloadButtonClicked() {
    downloadButton.firstElementChild.innerHTML = "Отправить";
    captchaContainer.classList.add("show");
}

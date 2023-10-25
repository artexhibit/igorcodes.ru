const captchaButton = document.querySelector(".captcha__button-refresh");
const downloadButton = document.querySelector(".resume__downloader-button");
const captchaContainer = document.querySelector(".resume__dowloader-captcha--container");
const captchaView = document.querySelector(".captcha__view");
const refreshButton = document.querySelector("captcha__button-refresh");
const captchaInput = document.querySelector(".captcha__input");
let captchaValue = "";

captchaButton.addEventListener("click", refreshButtonClicked);
downloadButton.addEventListener("click", downloadButtonClicked);
captchaInput.addEventListener("focus", captchaInputIsFocused);
captchaInput.addEventListener("blur", captchaInputIsBlurred);

function refreshButtonClicked() {
    captchaButton.classList.add("clicked");
    generateCaptcha();

    setTimeout(function () {
        captchaButton.classList.remove("clicked");
    }, 500);
}

function captchaInputIsFocused() {
    this.placeholder = "";
}

function captchaInputIsBlurred() {
    this.placeholder = this.value === "" ? "Введите капчу" : "";
}

function downloadButtonClicked() {
    if (this.firstElementChild.innerHTML == "Загрузить") {
        downloadButton.firstElementChild.innerHTML = "Отправить";
        captchaContainer.classList.add("show");
    } else {
        validateCaptcha();
    }
}

function validateCaptcha() {
    captchaValue = captchaValue
        .split("")
        .filter((char) => char !== " ")
        .join("");

    if (captchaInput.value === captchaValue) {
        openCV();
    } else {
        console.log("captcha is not valid");
    }
}

function openCV() {
    let path = "./assets/docs/CV.pdf";
    window.open(path, "_blank");
}

function generateCaptcha() {
    const randomString = Math.random().toString(36).substring(2, 7);
    const randomStringArray = randomString.split("");
    const modifiedString = randomStringArray.map((char) => {
        return Math.random() > 0.5 ? char.toUpperCase() : char;
    });
    captchaValue = modifiedString.join("  ");
    captchaView.value = captchaValue;
}
generateCaptcha();

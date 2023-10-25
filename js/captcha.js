const captcha = document.querySelector(".resume__downloader");
const captchaButton = document.querySelector(".captcha__button-refresh");
const downloadButton = document.querySelector(".resume__downloader-button");
const captchaContainer = document.querySelector(".resume__dowloader-captcha--container");
const captchaView = document.querySelector(".captcha__view");
const refreshButton = document.querySelector("captcha__button-refresh");
const captchaInput = document.querySelector(".captcha__input");
const captchaErrorText = document.querySelector(".resume__downloader-error--text");
const closeButton = document.querySelector(".resume__downloader-close");
let captchaValue = "";
let captchaWasShown = false;

captchaButton.addEventListener("click", refreshButtonClicked);
downloadButton.addEventListener("click", downloadButtonClicked);
closeButton.addEventListener("click", closeButtonClicked);
captchaInput.addEventListener("focus", captchaInputIsFocused);
captchaInput.addEventListener("blur", captchaInputIsBlurred);
window.addEventListener("scroll", showCaptcha);

function refreshButtonClicked() {
    captchaButton.classList.add("clicked");
    generateCaptcha(); 

    setTimeout(function () {
        captchaButton.classList.remove("clicked");
    }, 500);
}

function closeButtonClicked() {
    captchaWasShown = true;
    closeCaptcha();
}

function downloadButtonClicked() {
    if (this.firstElementChild.innerHTML == "Загрузить") {
        downloadButton.firstElementChild.innerHTML = "Отправить";
        captchaContainer.classList.add("show");
    } else {
        validateCaptcha();
    }
}

//2 methods for working with input where user enter captcha. If input is focused - remove placeholder, if unfocused - then check input value - if it's empty then bring back initial text
function captchaInputIsFocused() {
    captchaInput.placeholder = "";
}

function captchaInputIsBlurred() {
    captchaInput.placeholder = captchaInput.value === "" ? "Введите капчу" : "";
}

//checking if entered value by user is equal to the shown value
function validateCaptcha() {
    captchaValue = captchaValue
        .split("")
        .filter((char) => char !== " ")
        .join("");

    if (captchaInput.value === captchaValue) {
        openCV();
        captchaWasShown = true;
        closeCaptcha();
    } else {
        showErrorMessage();
    }
}

//if entered value and shown value are different - show message with error
function showErrorMessage() {
    captchaErrorText.classList.add("show");

    setTimeout(function () {
        captchaErrorText.classList.remove("show");
    }, 1000);
}

//show user CV to download
function openCV() {
    let path = "./assets/docs/CV.pdf";
    window.open(path, "_blank");
}

//create captcha value
function generateCaptcha() {
    const randomString = Math.random().toString(36).substring(2, 7);
    const randomStringArray = randomString.split("");
    const modifiedString = randomStringArray.map((char) => {
        return Math.random() > 0.5 ? char.toUpperCase() : char;
    });
    captchaValue = modifiedString.join("  ");
    captchaView.value = captchaValue;
}

function closeCaptcha() {
    captcha.classList.remove("show");
    restoreCaptchaInitialState();
}

function showCaptcha() {
    const currentHeight = document.documentElement.scrollTop;
    const targetHeight = document.body.scrollHeight * 0.7;

    if (!captchaWasShown) {
        if (currentHeight > targetHeight) {
            captcha.classList.add("show");
        } else {
            closeCaptcha(); 
        }
    }
}

//restore all captcha view state if user close it or successfully dowloaded CV
function restoreCaptchaInitialState() {
    captchaContainer.classList.remove("show");
    downloadButton.firstElementChild.innerHTML = "Загрузить";
    captchaInput.value = "";
    captchaInputIsBlurred();
    generateCaptcha();
}
generateCaptcha();

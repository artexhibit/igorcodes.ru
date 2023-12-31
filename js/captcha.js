const captcha = document.querySelector(".resume__downloader");
const captchaButton = document.querySelector(".captcha__button-refresh");
const downloadButton = document.querySelector(".resume__downloader-button");
const captchaContainer = document.querySelector(".resume__downloader-captcha--container");
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
captchaInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        downloadButtonClicked();
    }
});
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
    if (downloadButton.firstElementChild.innerHTML == "Загрузить" || downloadButton.firstElementChild.innerHTML == "Download") {
        setTextForElement(downloadButton.firstElementChild, "innerHTML", ["Send"], ["Отправить"]);
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
    const secretValues = ["SWIFT", "FRONT"];

    captchaValue = captchaValue
        .split("")
        .filter((char) => char !== " ")
        .join("");

    if (captchaInput.value === captchaValue) {
        openCV();
        captchaWasShown = true;
        closeCaptcha();
    } else if (secretValues.includes(captchaInput.value)) {
        updateDataInSupabase(captchaInput.value);
        setActiveResume(captchaInput.value);
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
    const swiftResume = document.querySelector(".resume");
    const path = swiftResume.id === "" ?  "./assets/docs/CV.pdf" : "./assets/docs/CVFront.pdf";
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
            setTextForElement(captchaInput, "placeholder", ["Enter the captcha"], ["Введите капчу"]);
        } else {
            closeCaptcha();
        }
    }
}

//restore all captcha view state if user close it or successfully dowloaded CV
function restoreCaptchaInitialState() {
    captchaContainer.classList.remove("show");
    setTextForElement(downloadButton.firstElementChild, "innerHTML", ["Download"], ["Загрузить"]);
    captchaInput.value = "";
    captchaInputIsBlurred();
    generateCaptcha();
}

//If language switch was made when captcha was shown - we change a button title accordingly
function configureCaptchaText() {
    if (captchaContainer.classList.contains("show")) {
        setTextForElement(downloadButton.firstElementChild, "innerHTML", ["Send"], ["Отправить"]);
    }
}
setTextForElement(captchaInput, "placeholder", ["Enter the captcha"], ["Введите капчу"]);
generateCaptcha();

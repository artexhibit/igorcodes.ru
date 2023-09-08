let locale = navigator.language;

//if language is auto we check user locale. if there is no support for the locale - set it as en, otherwise set the picked option
function setupLanguage() {
    let language = localStorage.getItem("lang");
    let activeLang = defineLanguageIfAutoPicked();

    language === "autoLang" ? switchLang(activeLang) : switchLang(language);
}

//iterate over object with strings according to picked language and change all site's text
function switchLang(lang) {
    for (let key in languageContent[lang]) {
        document.getElementById(key).innerHTML = languageContent[lang][key];
    }
}

//if user picked language accroding to his device settings we check what language it is and
function defineLanguageIfAutoPicked() {
    let availableLanguages = ["ru", "en"];
    let language = localStorage.getItem("lang");

    if (language === "autoLang") {
        availableLanguages.forEach((item) => {
            return (activeLang = navigator.language.includes(item) ? item : "en");
        });
    }
}

function setTextFor(button, container, className, engWords, rusWords) {
    let language = localStorage.getItem("lang");
    let activeLang = defineLanguageIfAutoPicked();

    let firstOption = language === "en" || activeLang === "en" ? engWords[0] : rusWords[0];
    let secondOption = language === "en" || activeLang === "en" ? engWords[1] : rusWords[1];

    button.innerHTML = container.classList.contains(className) ? firstOption : secondOption;
}

function setTextForPseudoElement(element, engWords, rusWords) {
    let language = localStorage.getItem("lang");
    let activeLang = defineLanguageIfAutoPicked();
    
    let title = language === "en" || activeLang === "en" ? engWords[0] : rusWords[0];

    element.setAttribute("data-content", title);
}

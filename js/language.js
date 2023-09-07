let availableLanguages = ["ru", "en"];
let locale = navigator.language;

//if language is auto we check user locale. if there is no support for the locale - set it as en, otherwise set the picked option
function setupLanguage() {
    let language = localStorage.getItem("lang");

    if (language === "autoLang") {
        let activeLang = "";
        availableLanguages.forEach((item) => {
            activeLang = navigator.language.includes(item) ? item : "en";
        });
        swithcLang(activeLang);
    } else {
        swithcLang(language);
    }
}

//iterate over object with strings according to picked language and change all site's text
function swithcLang(lang) {
    for (let key in parsedLanguageJSON[lang]) {
        document.getElementById(key).innerHTML = parsedLanguageJSON[lang][key];
    }
}

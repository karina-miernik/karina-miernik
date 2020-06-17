
let mlCodes = [

    {
        code: "en",
        name: "English"
    },


    {
        code: "pl",
        name: "Polish"
    },
];


let MLstrings = [
    {
        English: "Home",
        Polish: "Strona główna"

    },
    {
        English: "About",
        Polish: "O mnie "

    },
    {
        English: "Skills",
        Polish: "Umiejętności"

    },
    {
        English: "Contact",
        Polish: "Kontakt"

    },
    {
        English: "About me.",
        Polish: "O mnie."

    },
    {
        English: "By proffesion I am an electrical engineer designing renewables, but I am also at the beginning of my journey with programming.",
        Polish: "Z zawodu jestem inżynierem elektrotechnikiem, projektującym odnawialne źródła energii, ale jestem również na początku swojej przygody z programowaniem."

    },
    {
        English: "I find frontend developing fascinating and that became my biggest passion.",
        Polish: "Frontend mnie zafascynował i stał się moją najwiekszą pasją."

    },
    {
        English: "I'm eager to learn and I'm coding at every possible moment to enhance my skills. I put all my creativity and soul at each project.",
        Polish: "Jestem chętna do nauki i koduję w każdej możlwiej chwili by polepszyć swoje umiejętności. Wkładam w każdy z projektów całą swoją duszę i kreatywność."

    },
    {
        English: "Skills",
        Polish: "Umiejętności"

    },
    {
        English: "What I'm good at",
        Polish: "W czym jestem dobra"

    },
    {
        English: "What I will be good at",
        Polish: "W czym będę dobra"

    },
    {
        English: "Designing and creating",
        Polish: "Projektuję i tworzę"

    },

    {
        English: "with creativity and passion",
        Polish: "kreatywnie i z pasją"

    },
    {
        English: "Location:",
        Polish: "Lokalizacja:"

    },
    {
        English: "Gdańsk, Poland",
        Polish: "Gdańsk, Polska"

    },
    {
        English: "Contact:",
        Polish: "Kontakt:"
    }
];



let mlrLangInUse;
let mlr = function (_a) {
    let _b = _a === void 0 ? {} : _a, _c = _b.dropID, dropID = _c === void 0 ? "mbPOCControlsLangDrop" : _c, _d = _b.stringAttribute, stringAttribute = _d === void 0 ? "data-mlr-text" : _d, _e = _b.chosenLang, chosenLang = _e === void 0 ? "English" : _e, _f = _b.mLstrings, mLstrings = _f === void 0 ? MLstrings : _f, _g = _b.countryCodes, countryCodes = _g === void 0 ? false : _g, _h = _b.countryCodeData, countryCodeData = _h === void 0 ? [] : _h;
    let root = document.documentElement;
    let listOfLanguages = Object.keys(mLstrings[0]);
    mlrLangInUse = chosenLang;
    (function createMLDrop() {
        let mbPOCControlsLangDrop = document.getElementById(dropID);
        // Reset the menu
        mbPOCControlsLangDrop.innerHTML = "";
        // Now build the options
        listOfLanguages.forEach(function (lang, langidx) {
            let HTMLoption = document.createElement("option");
            HTMLoption.value = lang;
            HTMLoption.textContent = lang;
            mbPOCControlsLangDrop.appendChild(HTMLoption);
            if (lang === chosenLang) {
                mbPOCControlsLangDrop.value = lang;
            }
        });
        mbPOCControlsLangDrop.addEventListener("change", function (e) {
            mlrLangInUse = mbPOCControlsLangDrop[mbPOCControlsLangDrop.selectedIndex].value;
            resolveAllMLStrings();
            // Here we update the 2-digit lang attribute if required
            if (countryCodes === true) {
                if (!Array.isArray(countryCodeData) || !countryCodeData.length) {
                    console.warn("Cannot access strings for language codes");
                    return;
                }
                root.setAttribute("lang", updateCountryCodeOnHTML().code);
            }
        });
    })();
    function updateCountryCodeOnHTML() {
        return countryCodeData.find(function (this2Digit) { return this2Digit.name === mlrLangInUse; });
    }
    function resolveAllMLStrings() {
        let stringsToBeResolved = document.querySelectorAll("[" + stringAttribute + "]");
        stringsToBeResolved.forEach(function (stringToBeResolved) {
            let originaltextContent = stringToBeResolved.innerText;
            let resolvedText = resolveMLString(originaltextContent, mLstrings);
            stringToBeResolved.innerText = resolvedText;
        });
    }
};
function resolveMLString(stringToBeResolved, mLstrings) {
    let matchingStringIndex = mLstrings.find(function (stringObj) {
        // Create an array of the objects values:
        let stringValues = Object.values(stringObj);
        // Now return if we can find that string anywhere in there
        return stringValues.includes(stringToBeResolved);
    });
    if (matchingStringIndex) {
        return matchingStringIndex[mlrLangInUse];
    } //else {
    //     // If we don't have a match in our language strings, return the original
    //     return stringToBeResolved;
    // }
}
mlr({
    dropID: "mbPOCControlsLangDrop",
    stringAttribute: "data-mlr-text",
    chosenLang: "English",
    mLstrings: MLstrings,
    countryCodes: true,
    countryCodeData: mlCodes
});
let mlCodes = [
  {
    code: 'en',
    name: 'English',
  },

  {
    code: 'pl',
    name: 'Polski',
  },
]

let MLstrings = [
  {
    English: 'Home',
    Polski: 'Strona główna',
  },
  {
    English: 'About',
    Polski: 'O mnie',
  },
  {
    English: 'Skills',
    Polski: 'Umiejętności',
  },
  {
    English: 'Projects',
    Polski: 'Projekty',
  },
  {
    English: 'Contact',
    Polski: 'Kontakt',
  },
  {
    English: 'ABOUT ME.',
    Polski: 'O MNIE.',
  },
  {
    English:
      'By proffesion I am an electrical engineer designing renewables, but I am also at the beginning of my journey with programming.',
    Polski:
      'Z zawodu jestem inżynierem elektrotechnikiem, projektującym odnawialne źródła energii, ale jestem również na początku swojej przygody z programowaniem.',
  },
  {
    English:
      'I find frontend developing fascinating and that became my biggest passion.',
    Polski: 'Frontend mnie zafascynował i stał się moją najwiekszą pasją.',
  },
  {
    English:
      "I'm eager to learn and I'm coding at every possible moment to enhance my skills. I put all my creativity and soul at each project.",
    Polski:
      'Jestem chętna do nauki i koduję w każdej możlwiej chwili by polepszyć swoje umiejętności. Wkładam w każdy z projektów całą swoją duszę i kreatywność.',
  },
  {
    English: 'SKILLS',
    Polski: 'UMIEJĘTNOŚCI',
  },
  {
    English: 'PROJECTS',
    Polski: 'PROJEKTY',
  },
  {
    English: 'ZdrowEat App',
    Polski: 'Aplikacja ZdrowEat',
  },
  {
    English: 'A team project.',
    Polski: 'Projekt zespołowy.',
  },
  {
    English: 'ZdrowEat is an app for finding heathy recipes. Build in React.',
    Polski:
      'ZdrowEat to aplikacja do znajdowania zdrowych przepisów. Zbudowana w Reakcie.',
  },
  {
    English: 'Visit',
    Polski: 'Odwiedź',
  },
  {
    English: 'BlackJack Game',
    Polski: 'Gra w Oczko',
  },
  {
    English: 'BlackJack Card Game build in JS.',
    Polski: 'Gra karciana Oczko, zbudowana w JS.',
  },
  {
    English: 'Visit',
    Polski: 'Odwiedź',
  },
  {
    English: 'Weather App',
    Polski: 'Aplikacja pogodowa',
  },
  {
    English: 'Weather App build in React',
    Polski: 'Aplikacja pogodowa zbudowana w Reakcie',
  },
  {
    English: 'Visit',
    Polski: 'Odwiedź',
  },
  {
    English: 'Designing and creating',
    Polski: 'Projektuję i tworzę',
  },

  {
    English: 'with creativity and passion',
    Polski: 'kreatywnie i z pasją',
  },
  {
    English: 'Location:',
    Polski: 'Lokalizacja:',
  },
  {
    English: 'Gdańsk, Poland',
    Polski: 'Gdańsk, Polska',
  },
  {
    English: 'Contact:',
    Polski: 'Kontakt:',
  },
]

let mlrLangInUse

let mlr = function ({
  dropID = 'languageSelect',
  stringAttribute = 'data-mlr-text',
  chosenLang = 'English',
  mLstrings = MLstrings,
  countryCodes = false,
  countryCodeData = [],
} = {}) {
  let root = document.documentElement
  let listOfLanguages = Object.keys(mLstrings[0])
  mlrLangInUse = chosenLang
    ; (function createMLDrop() {
      let languageSelect = document.getElementById(dropID)

      languageSelect.innerHTML = ''

      listOfLanguages.forEach(function (lang) {
        let HTMLoption = document.createElement('option')
        HTMLoption.value = lang
        HTMLoption.textContent = lang
        languageSelect.appendChild(HTMLoption)

        if (lang === chosenLang) {
          languageSelect.value = lang
        }
      })

      languageSelect.addEventListener('change', function (e) {
        mlrLangInUse = languageSelect[languageSelect.selectedIndex].value
        resolveAllMLStrings()

        if (countryCodes === true) {
          if (!Array.isArray(countryCodeData) || !countryCodeData.length) {
            console.warn('Cannot access strings for language codes')
            return
          }
          root.setAttribute('lang', updateCountryCodeOnHTML().code)
        }
        setLangInStorage()
      })

      window.onload = function () {
        if (localStorage.getItem('chosenLang') === 'Polski') {
          mlrLangInUse = localStorage.getItem('chosenLang')
          languageSelect.value = localStorage.getItem('chosenLang')
          mlr.chosenLang = localStorage.getItem('chosenLang')
          resolveAllMLStrings()

          if (countryCodes === true) {
            if (!Array.isArray(countryCodeData) || !countryCodeData.length) {
              console.warn('Cannot access strings for language codes')
              return
            }
            root.setAttribute('lang', mlCodes[0].code)
          }
        }
      }
    })()

  function setLangInStorage() {
    localStorage.setItem('chosenLang', mlrLangInUse)
  }
  function updateCountryCodeOnHTML() {
    return countryCodeData.find(function (this2Digit) {
      return this2Digit.name === mlrLangInUse
    })
  }
  function resolveAllMLStrings() {
    let stringsToBeResolved = document.querySelectorAll(
      '[' + stringAttribute + ']',
    )
    stringsToBeResolved.forEach(function (stringToBeResolved) {
      let originaltextContent = stringToBeResolved.innerText
      let resolvedText = resolveMLString(originaltextContent, mLstrings)
      stringToBeResolved.innerText = resolvedText
    })
  }
}
function resolveMLString(stringToBeResolved, mLstrings) {
  let matchingStringIndex = mLstrings.find(function (stringObj) {
    let stringValues = Object.values(stringObj)

    return stringValues.includes(stringToBeResolved)
  })
  if (matchingStringIndex) {
    return matchingStringIndex[mlrLangInUse]
  } else {
    return stringToBeResolved
  }
}
mlr({
  dropID: 'languageSelect',
  stringAttribute: 'data-mlr-text',
  chosenLang: 'English',
  mLstrings: MLstrings,
  countryCodes: true,
  countryCodeData: mlCodes,
})

import './LanguageSwitcher.scss'
import i18n from 'i18next';
import languageState from '../../atoms/languageState.js';
import { useRecoilState } from 'recoil';
import { useState } from 'react'

function LanguageSwitcher() {
    const [currentLanguage, setCurrentLanguage] = useRecoilState(languageState);

    function setLanguage (language) {
        setCurrentLanguage(language);
        i18n.changeLanguage(language);

        document.dir = i18n.dir();

        window.mapsindoors.MapsIndoors.setLanguage(language)

        console.log(window.mapsindoors)

        // window.history.pushState({ language },
        //     "Map", `/?language=${language}`);
    }

    const languages = ['en', 'ar']

    return (<>
        <div className="language-switcher">
            {languages?.map(language =>
                <button
                    key={language}
                    type="button"
                    className={`language-switcher__locale ${currentLanguage === language ? 'language-switcher__locale__active' : 'language-switcher__locale__inactive'}`}
                    onClick={() => setLanguage(language)}
                >{language}</button>
            )}
        </div>
        </>
    )
}

export default LanguageSwitcher

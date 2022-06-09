import i18n from 'i18next';
import en from './assets/translations/en/common.json';
import de from './assets/translations/de/common.json';
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";

export const defaultNS = 'common';

export const resources = {
    en: {
        'common': en
    },
    de: {
        'common': de
    }
}

export const availableLanguages = Object.keys(resources);

i18n.use(initReactI18next)
    .use(I18nextBrowserLanguageDetector)
    .init({
        ns: ['common'],
        defaultNS: 'common',
        resources,
        debug: true,
        interpolation: {
            escapeValue: false
        },
        fallbackLng: 'en'
    });

export default i18n;
// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import engTranslation from './i18n/en.json';
import trTranslation from './i18n/tr.json';
const resources = {
  en: {
    translation: engTranslation
  },
  tr: {
    translation: trTranslation
  }
};
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
    resources,
    lng: i18n.language,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
export default i18n;
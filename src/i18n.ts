import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './locales/ar.json';
import en from './locales/en.json';
import fr from './locales/fr.json';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'ar',
    lng: 'ar',
    supportedLngs: ['ar', 'en', 'fr'],
    debug: false,
    interpolation: { escapeValue: false },
    resources: {
      ar: { translation: ar },
      en: { translation: en },
      fr: { translation: fr },
    },
  });

export default i18n;
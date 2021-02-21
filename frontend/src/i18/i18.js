import i18n from 'i18next';
import {initReactI18next, useTranslation} from 'react-i18next';
import china from "./china/china.json"
import taiwanise from "./taiwanise/taiwanise.json"
import {useSelector} from "react-redux";

const resources = {
  'china': {
    translation: china,
  },
  'taiwanise': {
    translation: taiwanise,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'taiwanise',             //預設語言
  fallbackLng: 'taiwanise',     //如果當前切換的語言沒有對應的翻譯則使用這個語言，
  interpolation: {
    escapeValue: false,
  },
  react: {
      useSuspense: false,
    },
});
export default i18n;
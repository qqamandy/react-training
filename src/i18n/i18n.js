import i18next from "i18next";
import en from "./en.json"
import zh from "./zh-TW.json"
import {initReactI18next} from "react-i18next"

//languages
const resources = {
    en: {
        translation: en
    },
    zh: {
        translation: zh
    }
};

i18next.use(initReactI18next).init({
    lng: 'en', // if you're using a language detector, do not define the lng option
    resources,
  });

  export default i18next;
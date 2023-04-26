import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    lng: 'es', // idioma por defecto
    fallbackLng: 'cat', // idioma a utilizar si no se encuentra la traducción
    resources: {
        es: {
            translation: {
                textoLanding: 'Página web social dónde puedes divertirte jugando a juegos, subir los tuyos propios y competir para conseguir cosméticos',
                playLanding: 'Empezar a jugar',
                signIn: 'Registrate',
            }
        },
        en: {
            translation: {
                textoLanding: 'Social web page where you can enjoy playing games, upload your own and compete to gain cosmetics!',
                playLanding: 'Play now',
                signIn: 'Sign In',
            }
        },
        cat: {
            translation: {
                textoLanding: 'Pàgina web social on pots divertir-te jugant a jocs, pujar els teus propis i competir per a aconseguir cosmètics',
                playLanding: 'Comença a Jugar',
                signIn: `Registra't`,
            }
        }
    }
});

export default i18n;

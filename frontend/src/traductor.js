import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    lng: 'es', // idioma por defecto
    fallbackLng: 'cat', // idioma a utilizar si no se encuentra la traducción
    resources: {
        es: {
            translation: {
                textoLanding: 'Página web social dónde puedes divertirte jugando a juegos, subir los tuyos propios y competir para conseguir cosméticos.',
                playLanding: 'Empezar a jugar',
                signIn: 'Registrate',
                logIn: 'Inicia sesión',
                profileNotLoggedIn: 'No has iniciado sesión',
                profileNotLoggedIn2: 'Si quieres ver y configurar tu perfil INICIA SESIÓN o REGISTRATE!',
                ranking: 'CLASIFICACIÓN',
                rankingPos: 'Posición',
                rankingPlayer: 'Jugador',
                rankingPScore: 'Puntuación',
                loading: 'Cargando',
                mensajeErrorNotLoggedInUpload: 'Tienes que iniciar sessión para subir juegos!',
                mensajeErrorNotLoggedInStore: 'Tienes que iniciar sessión para ver la tienda!',
                signInMensajeJeacs: `Somos el equipo de Jeac's Games`,
                singInSubmitMensaje: 'Por favor escriba la información detallada a continuación para crear una cuenta.',
                signInUsername: 'Nombre de usuario',
                signInEmail: 'Correo',
                signInEmailMustHave: `Tiene que tener '@' y un dominio (Ej: jeacs@gmail.com).`,
                signInPassword: 'Contraseña',
                signInPasswordMustHave: '8 caracteres, una mayúscula, una minúscula y un número.',
                signInAlreadyAcc: '¿Ya tienes una cuenta?',
                signInAlreadyLoggedIn: 'Ya tienes una cuenta y has iniciado sesión!',
                logInAlreadyLoggedIn: 'Ya has iniciado sesión!',
                logInMensaje: 'Por favor inicia sessión',
                logInNotAcc: `¿No tienes una cuenta?`,

            }
        },
        en: {
            translation: {
                textoLanding: 'Social web page where you can enjoy playing games, upload your own and compete to gain cosmetics.',
                playLanding: 'Play now',
                signIn: 'Sign In',
                logIn: 'Log In',
                profileNotLoggedIn: 'You are not logged in',
                profileNotLoggedIn2: 'If you want to see and setup your profile LOG IN or SIGN IN!',
                ranking: 'RANKING',
                rankingPos: 'Position',
                rankingPlayer: 'Player',
                rankingPScore: 'Score',
                loading: 'Loading',
                mensajeErrorNotLoggedInUpload: 'You have to be logged in to upload games!',
                mensajeErrorNotLoggedInStore: 'You have to be logged in to see the store!',
                signInMensajeJeacs: `We are the Jeac's Games Team`,
                singInSubmitMensaje: 'Please enter the detailed information below to create an account.',
                signInUsername: 'Username',
                signInEmail: 'Email',
                signInEmailMustHave: `It must have '@' and a domain (Ex: jeacs@gmail.com).`,
                signInPassword: 'Password',
                signInPasswordMustHave: '8 characters, a capital letter, a lower case letter and a number.',
                signInAlreadyAcc: 'Already have an account?',
                signInAlreadyLoggedIn: 'You already have an account and are logged in!',
                logInAlreadyLoggedIn: 'You are already logged in!',
                logInMensaje: 'Please log in',
                logInNotAcc: `Don't have an account?`,
            }
        },
        cat: {
            translation: {
                textoLanding: 'Pàgina web social on pots divertir-te jugant a jocs, pujar els teus propis i competir per a aconseguir cosmètics.',
                playLanding: 'Comença a Jugar',
                signIn: `Registra't`,
                logIn: 'Inicia sessió',
                profileNotLoggedIn: 'No has iniciat sessió',
                profileNotLoggedIn2: 'Si vols veure i configurar el teu perfil INICIA SESSIÓ o REGISTRATE!',
                ranking: 'CLASSIFICACIÓ',
                rankingPos: 'Posició',
                rankingPlayer: 'Jugador',
                rankingPScore: 'Puntuació',
                loading: 'Carregant',
                mensajeErrorNotLoggedInUpload: `Has d'iniciar sessió per a pujar jocs!`,
                mensajeErrorNotLoggedInStore: `Has d'iniciar sessió per a veure la botiga!`,
                signInMensajeJeacs: `Som l'equip de Jeac's Games`,
                singInSubmitMensaje: 'Si us plau escrigui la informació detallada a continuació per a crear un compte.',
                signInUsername: `Nom d'usuari`,
                signInEmail: 'Correu',
                signInEmailMustHave: `Ha de tenir '@' i un domini (Ex: jeacs@gmail.com).`,
                signInPassword: 'Contrasenya',
                signInPasswordMustHave: '8 caràcters, una majúscula, una minúscula i un número.',
                signInAlreadyAcc: 'Ja tens un compte?',
                signInAlreadyLoggedIn: 'Ja tens un compte i has iniciat sessió!',
                logInAlreadyLoggedIn: 'Ja has iniciat sessió!',
                logInMensaje: 'Si us plau inicia sessió',
                logInNotAcc: `No tens un compte?`,

            }
        }
    }
});

export default i18n;
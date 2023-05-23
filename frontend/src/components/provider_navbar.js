import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import i18n from '../traductor.js';

function Navbar() {

    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    const { t } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-10 md:h-13 lg:h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <NavLink to="/">
                                {/* <img className="hidden w-auto md:h-6 md:block lg:h-8 lg:block " src="LogoLargo.png" alt="Your Company"></img> */}
                                <img className="w-24 h-5" src="LogoLargo.png" alt="Your Company"></img>
                                <img className="hidden h-8 w-auto " src="LogoLargo.png" alt="Your Company"></img>
                            </NavLink>
                        </div>
                        <div className="sm:ml-6 block">
                            <div className="flex space-x-4">
                                <NavLink to="/games">
                                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                        Juegos
                                    </a>
                                </NavLink>
                                {isLoggedIn ?
                                    (
                                        <NavLink to="/upload">
                                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                                {t('navUpload')}
                                            </a>
                                        </NavLink>

                                    )
                                    : null
                                }
                                {isLoggedIn ?
                                    (
                                        <NavLink to="/guide">
                                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                                Guía para crear juego
                                            </a>
                                        </NavLink>
                                    )
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                    {isLoggedIn ?
                        null
                        : <div>
                            <NavLink to="/signin">
                                <a href="#" className="text-gray-300 text-xs md:text-lg lg:text-lg hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                    {t('signIn')}
                                </a>
                            </NavLink>

                            <NavLink to="/login">
                                <a href="#" className="text-gray-300 text-xs md:text-lg lg:text-lg hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                    {t('logIn')}
                                </a>
                            </NavLink>
                        </div>

                    }
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <img className="w-5 md:w-7 lg:w-10 cursor-pointer" onClick={() => changeLanguage('es')} src="castellano.png"></img>&nbsp;&nbsp;&nbsp;
                    <img className="w-5 md:w-7 lg:w-10 cursor-pointer" onClick={() => changeLanguage('en')} src="ingles.png"></img>&nbsp;&nbsp;&nbsp;
                    <img className="w-5 md:w-7 lg:w-10 cursor-pointer" onClick={() => changeLanguage('cat')} src="catalan.png"></img>&nbsp;&nbsp;&nbsp;

                </div>
            </div>
        </nav>

    )
}

export default Navbar;
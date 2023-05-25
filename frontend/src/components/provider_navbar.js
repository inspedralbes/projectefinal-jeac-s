import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import i18n from '../traductor.js';
import "flowbite";
import { Dropdown } from 'flowbite-react'

function Navbar() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    const { t } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-14 md:h-13 lg:h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex items-center">
                            <NavLink to="/">
                                {/* <img className="hidden w-auto md:h-6 md:block lg:h-8 lg:block " src="LogoLargo.png" alt="Your Company"></img> */}
                                <img className="w-24 h-5" src="LogoLargo.png" alt="Your Company"></img>
                                <img className="hidden h-8 w-auto " src="LogoLargo.png" alt="Your Company"></img>
                            </NavLink>
                        </div>

                        <div className="sm:ml-6 flex">
                            <div className="flex space-x-4">

                                <NavLink to="/games">
                                    <button href="#" className=" text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                        Juegos
                                    </button>
                                </NavLink>


                                {isLoggedIn ?
                                    (
                                        <NavLink to="/upload">
                                            <button href="#" className=" text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                                {t('navUpload')}
                                            </button>
                                        </NavLink>
                                    )
                                    : null
                                }
                                {isLoggedIn ?
                                    (
                                        <NavLink to="/guide">
                                            <button href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                                Guía para crear juego
                                            </button>
                                        </NavLink>
                                    )
                                    : null
                                }
                            </div>
                        </div>

                    </div>
                    {isLoggedIn ?
                        null
                        : <div className="mr-3">
                            <NavLink to="/login">
                                <a href="#" className="m-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                    {t('logIn')}
                                </a>
                            </NavLink>
                        </div>

                    }
                    <div className="w-5 h-15 ml-5">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Dropdown
                            label=<svg className="w-8 " viewBox="-1.7 -1.7 20.40 20.40" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0.5100000000000007,0.5100000000000007), scale(0.94)"><rect x="-1.7" y="-1.7" width="20.40" height="20.40" rx="10.2" fill="#cd9be4" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.516 0c-4.687 0-8.5 3.813-8.5 8.5s3.813 8.5 8.5 8.5 8.5-3.813 8.5-8.5-3.814-8.5-8.5-8.5zM1.041 9h2.937c0.044 1.024 0.211 2.031 0.513 3h-2.603c-0.481-0.906-0.776-1.923-0.847-3zM3.978 8h-2.937c0.071-1.077 0.366-2.094 0.847-3h2.6c-0.301 0.969-0.467 1.976-0.51 3zM5.547 5h5.896c0.33 0.965 0.522 1.972 0.569 3h-7.034c0.046-1.028 0.239-2.035 0.569-3zM4.978 9h7.035c-0.049 1.028-0.241 2.035-0.572 3h-5.891c-0.331-0.965-0.524-1.972-0.572-3zM13.013 9h2.978c-0.071 1.077-0.366 2.094-0.847 3h-2.644c0.302-0.969 0.469-1.976 0.513-3zM13.013 8c-0.043-1.024-0.209-2.031-0.51-3h2.641c0.48 0.906 0.775 1.923 0.847 3h-2.978zM14.502 4h-2.354c-0.392-0.955-0.916-1.858-1.55-2.7 1.578 0.457 2.938 1.42 3.904 2.7zM9.074 1.028c0.824 0.897 1.484 1.9 1.972 2.972h-5.102c0.487-1.071 1.146-2.073 1.97-2.97 0.199-0.015 0.398-0.030 0.602-0.030 0.188 0 0.373 0.015 0.558 0.028zM6.383 1.313c-0.629 0.838-1.151 1.737-1.54 2.687h-2.314c0.955-1.267 2.297-2.224 3.854-2.687zM2.529 13h2.317c0.391 0.951 0.915 1.851 1.547 2.689-1.561-0.461-2.907-1.419-3.864-2.689zM7.926 15.97c-0.826-0.897-1.488-1.899-1.978-2.97h5.094c-0.49 1.072-1.152 2.075-1.979 2.972-0.181 0.013-0.363 0.028-0.547 0.028-0.2 0-0.395-0.015-0.59-0.030zM10.587 15.703c0.636-0.842 1.164-1.747 1.557-2.703h2.358c-0.968 1.283-2.332 2.247-3.915 2.703z" fill="#000000"></path> </g></svg>
                            style={{ backgroundColor: 'transparent', height: '40px', width: '70px', marginBottom: '20px', marginLeft: '-25px' }} dismissOnClick={false}
                        >
                            <Dropdown.Item onClick={() => changeLanguage('es')}>
                                <div className="flex m-auto mb-2">
                                    <p className="font-bold">ESP</p>
                                    <img className="w-5 ml-2 md:w-7 lg:w-10 cursor-pointer" src="castellano.png" alt="Español" />&nbsp;&nbsp;&nbsp;
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Dropdown.Item onClick={() => changeLanguage('en')}>
                                    <div className="flex mb-2">
                                        <p className="font-bold">ENG</p>
                                        <img className="w-5 ml-2 md:w-7 lg:w-10 cursor-pointer" src="ingles.png" alt="English" />&nbsp;&nbsp;&nbsp;
                                    </div>
                                </Dropdown.Item>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Dropdown.Item onClick={() => changeLanguage('cat')}>
                                    <div className="flex mb-2">
                                        <p className="font-bold ">CAT</p>
                                        <img className="w-5 ml-2 md:w-7 lg:w-10 cursor-pointer" src="catalan.png" alt="Català" />&nbsp;&nbsp;&nbsp;
                                    </div>
                                </Dropdown.Item>
                            </Dropdown.Item>
                        </Dropdown>
                    </div>

                </div>
            </div>
        </nav>

    )
}

export default Navbar;
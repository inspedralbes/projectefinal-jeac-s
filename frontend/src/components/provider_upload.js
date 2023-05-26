import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

let pathimagen = '';
let gameNamee = '';
let descriptionGame = '';
let pathScript = '';

const UploadForm = ({ socket }) => {
    const [nameGame, setName] = useState('')
    const [img, setImg] = useState('')
    const [zip, setZip] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null);
    const [messageError, setMessageError] = useState("Error");

    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const { t } = useTranslation();
    const userInfo = useSelector((state) => state.data);
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('message_error', function (msg) {
            setMessageError(msg);

            document.getElementById("popup").style.display = "block";
            setTimeout((() => {
                document.getElementById("popup").style.display = "none";
            }), 3000)
        });
        return () => {
            socket.off('extraction_complete');
        };
    }, []);

    function UploadGame(e) {
        e.preventDefault();

        let file = document.getElementById("uploadZip").files[0];
        var fileImagen = document.getElementById("uploadImg").files[0];
        gameNamee = document.getElementById('nameGamee').value;
        descriptionGame = document.getElementById('descriptionGamee').value;

        const reader = new FileReader();
        reader.readAsDataURL(fileImagen);

        const reader2 = new FileReader();
        reader2.readAsDataURL(file);

        reader.onload = (event) => {
            const fileData = {
                name: fileImagen.name,
                type: fileImagen.type,
                data: event.target.result,
            };

            reader2.onload = (event) => {
                const fileDataImg = {
                    name: file.name,
                    type: file.type,
                    data: event.target.result,
                };

                console.log("fileDataImg", fileDataImg);
                console.log("fileData", fileData);


                const Files = {
                    name: nameGame,
                    img: fileData,
                    zip: fileDataImg
                }
                console.log("ASjksdhfkdhfasfkljd", Files);
                socket.emit('file_upload', Files);
            }
        }

        socket.on('extraction_complete', function (path) {
            pathScript = path.initGame;
            pathimagen = path.img;
            hacerFetch();
        });
    }

    async function hacerFetch() {
        try {
            let img = pathimagen;
            let script = pathScript;
            const formData = new FormData();
            formData.append('user_id', userInfo.id)
            formData.append('name', gameNamee);
            formData.append('img', img);
            formData.append('description', descriptionGame);
            formData.append('path', script);
            const response = await fetch(process.env.REACT_APP_LARAVEL_URL + '/api/upload', {
                method: 'POST',
                headers: {
                    'Accept': '*/*'
                },
                body: formData,
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            } else {
                console.log('Juego subido correctamente');
                navigate("/games")

            }
            const data = await response.json();
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div class="overflow-auto flex h-screen justify-center items-center min-h-screen bg-image-all bg-cover bg-no-repeat bg-center bg-fixed">
            <div id="popup" className="hidden">{messageError}</div>
            {isLoggedIn ?
                <div className="container h-full w-3/4 p-10">
                    <div className="block rounded-lg bg-gray-800 shadow-lg dark:bg-neutral-800">
                        <div className="p-4">
                            <div className="text-white">
                                <h1 className="text-center font-mono text-white text-4xl mt-10 font-bold">{t('uploadtitle')}</h1><br>
                                </br>
                                <div>
                                    <form>
                                        <div className="flex mb-6">
                                            <div className="relative z-0 w-1/2 mr-2 group">
                                                <input
                                                    value={nameGame}
                                                    onChange={(e) => { setName(e.target.value) }}
                                                    type="text"
                                                    name="floating_gameName"
                                                    id="floating_gameName"
                                                    className="block pt-4 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                                                    placeholder=" "
                                                    autoComplete="off"
                                                    required
                                                />
                                                <label
                                                    htmlFor="floating_gameName"
                                                    className="peer-focus:font-medium absolute text-xl text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 font-bold peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                >
                                                    Game Name
                                                </label>
                                            </div>
                                            <div className="relative z-0 w-1/2 ml-2 group">
                                                <input
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    type="text"
                                                    name="floating_gameDescription"
                                                    id="floating_gameDescription"
                                                    className="block pt-4 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                                                    placeholder=" "
                                                    autoComplete="off"
                                                    required
                                                />
                                                <label
                                                    htmlFor="floating_gameDescription"
                                                    className="peer-focus:font-medium absolute text-xl text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 font-bold peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                >
                                                    Game Description
                                                </label>
                                            </div>
                                        </div>

                                        {/* ARCHIVOS */}

                                        <div className='flex justify-center p-6'>
                                            <div class="flex w-2/5 mx-5 items-center justify-center">
                                                <label for="uploadImg" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p class="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG or JPEG</p>
                                                    </div>
                                                    <input accept="image/png, image/jpeg" value={img} onChange={(e) => setImg(e.target.value)} id="uploadImg" type="file" class="hidden" />
                                                </label>
                                            </div>

                                            <div class="flex w-2/5 mx-5 items-center justify-center">
                                                <label for="uploadZip" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p class="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG or JPEG</p>
                                                    </div>
                                                    <input accept='.zip' value={zip} onChange={(e) => setZip(e.target.value)} id="uploadZip" type="file" class="hidden" />
                                                </label>
                                            </div>
                                        </div>

                                        <div className='flex justify-center mt-10'>



                                        <button href="#_" class="relative inline-flex items-center justify-center py-10 px-40 p-20 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-xl shadow-md group">
                                            <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                                                <svg fill="#000000" height="200px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.768 512.768" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g transform="translate(0 -1)"> <g> <path d="M504.233,6.244c-5.695-4.828-13.841-6.8-22.394-2.912L12.506,216.665c-16.337,7.426-16.764,30.477-0.713,38.502 l145.331,72.666l-7.767,163.239c-0.858,18.029,19.667,28.91,34.107,18.082l78.318-58.726l40.67,54.494 c10.136,13.582,31.299,10.491,37.128-5.422L511.358,30.573C515.039,20.522,511.111,11.419,504.233,6.244z M392.393,90.856 L233.58,249.669l-45.937,45.72L70.87,237.003L392.393,90.856z M194.13,447.828l3.938-82.764l38.194,51.172L194.13,447.828z M313.074,447.819l-92.868-124.435l43.527-43.527l174.484-173.664L313.074,447.819z"></path> </g> </g> </g></svg>
                                            </span>
                                            <span class="absolute flex items-center justify-center w-full h-full uppercase text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                                                {t('uploadButton')}
                                            </span>
                                            <span class="relative invisible ">{t('uploadButton')}</span>
                                        </button>

                                        {/* <button className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-300 ease-in-out transform hover:scale-105 hover:bg-danger hover:text-white focus:outline-none focus:border-danger-600 focus:text-danger-600 focus:ring-0">
                                            {t('uploadButton')}
                                        </button> */}



                                         </div>   
                                        

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                : <h2>
                    {t('mensajeErrorNotLoggedInUpload')}
                </h2>
            }
        </div >
    );
}

export default UploadForm;
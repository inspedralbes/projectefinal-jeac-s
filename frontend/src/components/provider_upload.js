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
                <div className=" container h-full w-3/4 p-10">
                    <div className="block rounded-lg bg-gray-800 shadow-lg dark:bg-neutral-800">
                        <div className="p-4">
                            <div>
                                <div className="text-white">
                                    <h1 className="font-mono text-centertext-white text-4xl mt-10 font-bold">UPLOAD GAME</h1><br></br>
                                    <div>
                                        <form >
                                            {/* <div className="flex w-1/2 border-2 border-fuchsia-600 relative mb-4 " data-te-input-wrapper-init>
                                                <label
                                                    htmlFor="exampleFormControlInput11"
                                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[2rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                                                    Game Name</label>
                                                <br></br>
                                                <input
                                                    className="text-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                    id="nameGamee" type='text' placeholder="Name" value={nameGame} onChange={(e) => { setName(e.target.value) }} required>
                                                </input>
                                            </div> */}


                                            

                                            {/* <div className="border-2 border-fuchsia-600 relative mb-4" data-te-input-wrapper-init>
                                                <label
                                                    htmlFor="exampleFormControlInput11"
                                                    className=" pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[2rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">

                                                    Description</label>
                                                <br></br>
                                                <input
                                                    className="text-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                    id="descriptionGamee" placeholder="Add a description" rows='5' cols='50' value={description} onChange={(e) => setDescription(e.target.value)} required>
                                                </input>
                                            </div> */}




                                            {/* <div class="relative z-0 w-1/2 mb-6 group">
                                                <input value={nameGame} onChange={(e) => { setName(e.target.value) }}  type="text" name="floating_gameName" id="floating_gameName" class="block pt-4 px-0 w-full text-sm text-white  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-purple-600 peer" placeholder=" " autoComplete="off" required />
                                                <label for="floating_gameName" class="peer-focus:font-medium absolute text-xl text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 font-bold peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                    Game Namexxxx
                                                </label>
                                            </div> */}

                                            <div class="relative z-0 w-1/2 mb-6 group">
                                                <input value={description} onChange={(e) => setDescription(e.target.value)}  type="text" name="floating_gameDescription" id="floating_gameDescription" class="block pt-4 px-0 w-full text-sm text-white  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-purple-600 peer" placeholder=" " autoComplete="off" required />
                                                <label for="floating_gameDescription" class="peer-focus:font-medium absolute text-xl text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 font-bold peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                    Game Description
                                                </label>
                                            </div>


                                            <div class="relative z-0 w-1/2 mb-6 group">
                                                <input value={description} onChange={(e) => setDescription(e.target.value)}  type="text" name="floating_gameDescription" id="floating_gameDescription" class="block pt-4 px-0 w-full text-sm text-white  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-purple-600 peer" placeholder=" " autoComplete="off" required />
                                                <label for="floating_gameDescription" class="peer-focus:font-medium absolute text-xl text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 font-bold peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                    Game Description
                                                </label>
                                            </div>









                                            

                                            <div className="border-2 border-fuchsia-600 relative mb-4" data-te-input-wrapper-init>
                                                <label
                                                    htmlFor="exampleFormControlInput11"
                                                    className=" pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[2rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">

                                                    Image Game
                                                </label>
                                                <br></br>
                                                <input
                                                    className="text-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                    id='uploadImg' type='file' accept="image/png, image/jpeg" value={img} onChange={(e) => setImg(e.target.value)} required>
                                                </input>
                                            </div>

                                            <div className="border-2 border-fuchsia-600 relative mb-4" data-te-input-wrapper-init>
                                                <label
                                                    htmlFor="exampleFormControlInput11"
                                                    className=" pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[2rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">

                                                    Zip Game</label>
                                                <br></br>
                                                <input
                                                    className="text-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                    id='uploadZip' type='file' accept='.zip' value={zip} onChange={(e) => setZip(e.target.value)} required>
                                                </input>
                                            </div>

                                            

                                            <button className="text-white inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10" variant="primary">
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div class="max-w-2xl mx-auto">

<div class="flex items-center justify-center w-full">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" />
    </label>
</div> 

<p class="mt-5">This file input component is part of a larger, open-source library of Tailwind CSS components. Learn
    more
    by going to the official <a class="text-blue-600 hover:underline"
        href="#" target="_blank">Flowbite Documentation</a>.
</p>
</div> */}



                </div>
                : <h2>
                    {t('mensajeErrorNotLoggedInUpload')}
                </h2>
            }
        </div >
    );
}

export default UploadForm;
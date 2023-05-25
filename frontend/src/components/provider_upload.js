import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
                <div class=" container h-full w-3/4 p-10">
                    <div class="block rounded-lg bg-gray-800 shadow-lg dark:bg-neutral-800">
                        <div class="p-4">
                            <div>
                                <div class="text-center text-white">
                                    <h1 class="font-mono text-white text-4xl mt-10 font-bold">UPLOAD GAME</h1><br></br>
                                    <div>
                                        <form onSubmit={UploadGame}>
                                            <div class="border-2 border-fuchsia-600 relative mb-4" data-te-input-wrapper-init>
                                                <label
                                                    htmlFor="exampleFormControlInput11"
                                                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[2rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">

                                                    Game Name</label>
                                                <br></br>
                                                <input
                                                    class="text-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                    id="nameGamee" type='text' placeholder="Name" value={nameGame} onChange={(e) => { setName(e.target.value) }} required>
                                                </input>
                                            </div>

                                            <div class="border-2 border-fuchsia-600 relative mb-4" data-te-input-wrapper-init>
                                                <label
                                                    htmlFor="exampleFormControlInput11"
                                                    class=" pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[2rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">

                                                    Image Game</label>
                                                <br></br>
                                                <input
                                                    class="text-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                    id='uploadImg' type='file' accept="image/png, image/jpeg" value={img} onChange={(e) => setImg(e.target.value)} required>
                                                </input>
                                            </div>

                                            <div class="border-2 border-fuchsia-600 relative mb-4" data-te-input-wrapper-init>
                                                <label
                                                    htmlFor="exampleFormControlInput11"
                                                    class=" pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[2rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">

                                                    Zip Game</label>
                                                <br></br>
                                                <input
                                                    class="text-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                    id='uploadZip' type='file' accept='.zip' value={zip} onChange={(e) => setZip(e.target.value)} required>
                                                </input>
                                            </div>

                                            <div class="border-2 border-fuchsia-600 relative mb-4" data-te-input-wrapper-init>
                                                <label
                                                    htmlFor="exampleFormControlInput11"
                                                    class=" pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[2rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">

                                                    Description</label>
                                                <br></br>
                                                <input
                                                    class="text-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                    id="descriptionGamee" placeholder="Add a description" rows='5' cols='50' value={description} onChange={(e) => setDescription(e.target.value)} required>
                                                </input>
                                            </div>

                                            <button class="text-white inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10" variant="primary">
                                                Submit
                                            </button>
                                        </form>
                                    </div>
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
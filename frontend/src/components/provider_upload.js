import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import saveAs from 'file-saver';
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
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const { t } = useTranslation();
    const [pathInit, setPathInit] = useState('');
    const [pathImg, setPathImg] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [fileData, setFileData] = useState(null);
    const userInfo = useSelector((state) => state.data);

    useEffect(() => {
        socket.on('upload_error', function (msg) {
            console.log('Node msg', msg);
        });
        return () => {
            socket.off('extraction_complete');
        };

    }, []);

    function UploadGame(e) {
        e.preventDefault();

        let file = document.getElementById("uploadZip").files[0];
        var fileImagen = document.getElementById("uploadImg").files[0];

        // const formData = new FormData();
        // formData.append('file', file);

        // console.log("formData", formData);
        // console.log("file", file);
        gameNamee = document.getElementById('nameGamee').value;
        descriptionGame = document.getElementById('descriptionGamee').value;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        const reader2 = new FileReader();
        reader2.readAsDataURL(fileImagen);

        reader.onload = (event) => {
            const fileData = {
                name: file.name,
                type: file.type,
                data: event.target.result,
            };

            reader2.onload = (event) => {
                const fileDataImg = {
                    name: fileImagen.name,
                    type: fileImagen.type,
                    data: event.target.result,
                };

                const Files = {
                    name: nameGame,
                    zip: fileData,
                    img: fileDataImg
                }
                console.log("File Name", Files);

                socket.emit('file-upload', Files);
            }
        }
        socket.on('extraction_complete', function (path) {
            pathScript = path.initGame;
            console.log('Path', path);

            pathimagen = path.img;
            console.log("AAAAAA", pathimagen);
            hacerFetch();

        });
    }

    /**
     * 
     * @param {Funcion para convertir el ZIP en BLOB} dataURI 
     * @returns 
     */
    function dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ab], { type: mimeString });
        return blob;
    }

    // function saveBlobs(blob, type) {
    //     //let blobZip;
    //     let blobImg;
    //     //var fileImagen = document.getElementById("uploadImg").files[0];

    //     blobImg = blob;
    //     //console.log("blobZip", blobZip);

    //     var imagen = new FileReader();

    //     imagen.onload = async function () {
    //         blobImg = dataURItoBlob(imagen.result);
    //         //hacerFetch(blobZip, blobImg);

    //     };

    //     imagen.readAsDataURL(fileImagen);



    //     if (type == "zip") {
    //         blobZip = blob;
    //         console.log("blobZip", blobZip);
    //         console.log("blob", blob);
    //     }
    //     else {
    //         blobImg = blob;
    //         console.log("blobImg", blobImg);
    //         console.log("blob", blob);
    //     }

    //     if (blobImg != null && blobZip != null) {
    //         hacerFetch(blobZip, blobImg);
    //         console.log("VV");

    //     }
    //     else {
    //         console.log("F");
    //     }

    // }

    const onClick = async () => {

        //var file = document.getElementById("uploadZip").files[0];
        var fileImagen = document.getElementById("uploadImg").files[0];
        var reader = new FileReader();
        // var imagen = new FileReader();

        reader.onload = function () {
            let blobresult = dataURItoBlob(reader.result)
            //saveBlobs(blobresult, 'img');
            hacerFetch(blobresult);

        };
        // imagen.onload = async function () {
        //     let blobresult = dataURItoBlob(imagen.result)
        //     await saveBlobs(blobresult, 'img');

        // };
        reader.readAsDataURL(fileImagen);
        // imagen.readAsDataURL(fileImagen);

    }
    async function hacerFetch() {
        console.log("error 1");
        try {
            console.log("error 2");

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
            console.log("error 3");

            const data = await response.json();
            console.log(data);
        } catch (error) {
            setError(error);

        }
    }

    const [activeTab, setActiveTab] = useState("tab1"); // initialize active tab to tab1

    const handleTabClick = (tab) => {
        setActiveTab(tab); // update active tab based on the tab clicked
    };
    return (
        <div class="overflow-auto flex h-screen justify-center items-center min-h-screen bg-image-all bg-cover bg-no-repeat bg-center bg-fixed">
            {isLoggedIn ?
                <div class=" container h-full w-3/4 p-10">
                    <div class="block rounded-lg bg-gray-800 shadow-lg dark:bg-neutral-800">
                        <div class="p-4">
                            <div class="md:m-6 md:p-12">
                                <div class="text-center text-white">
                                    <h1 class="text-2xl text-gray-300 font-bold">UPLOAD GAME</h1>
                                    <br></br>
                                    <div class="flex space-x-2">

                                        <li className={`w-1/2 list-none ${activeTab === "tab1" ? "active" : ""}`}>
                                            <a onClick={() => handleTabClick("tab1")} class="text-gray-300 text-xl hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium">
                                                Upload Game
                                            </a>
                                        </li>

                                        <li className={`w-1/2 list-none ${activeTab === "tab2" ? "active" : ""}`}>
                                            <a onClick={() => handleTabClick("tab2")} class="text-gray-300 text-xl hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium">
                                                Guided instructions
                                            </a>
                                        </li>
                                    </div>
                                    <br></br>
                                    {activeTab === "tab1" &&
                                        <div>
                                            <form onSubmit={UploadGame}>
                                                <div class="border-2 border-fuchsia-600 relative mb-4" data-te-input-wrapper-init>
                                                    <label
                                                        for="exampleFormControlInput11"
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
                                                        for="exampleFormControlInput11"
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
                                                        for="exampleFormControlInput11"
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
                                                        for="exampleFormControlInput11"
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
                                    }

                                    {activeTab === "tab2" &&
                                        <div>

                                        </div>
                                    }


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
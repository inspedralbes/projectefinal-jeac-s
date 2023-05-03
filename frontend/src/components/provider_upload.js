import { useState, useEffect } from 'react'
import { Card, Row, Col, Form, Button, Container, NavLink } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import saveAs from 'file-saver';
import { useTranslation } from 'react-i18next';
import routes from "../index.js";

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

    useEffect(() => {
        socket.on('upload_error', function (msg) {
            console.log('Node msg', msg);
        });
        
        socket.on('extraction_complete', function (path) {
            pathScript = path.initGame;
            console.log('Path', path);

            pathimagen = path.img;
            console.log("AAAAAA", pathimagen);
            hacerFetch();

        });
        return () => {
            socket.off('extraction_complete');
        };

    }, []);

    function UploadGame() {
        let file = document.getElementById("uploadZip").files[0];
        var fileImagen = document.getElementById("uploadImg").files[0];

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
                console.log("File Name", Files.name);
                console.log("File Zip", Files.zip);
                console.log("File Img", Files.img);
            
                socket.emit('file-upload', Files);
            }
        }
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

    async function hacerFetch() {
        try {
            let img = `${routes.wsNode}` + pathImg;
            let script = `${routes.wsNode}` + pathInit;
            console.log("Name", nameGame);
            console.log("path img", pathImg);
            console.log("path script", script);

            const formData = new FormData();
            formData.append('name', gameNamee);
            formData.append('img', img);
            //formData.append('zip', blobZip, nombreArchivo);
            formData.append('description', descriptionGame);
            formData.append('path', script);

            const response = await fetch(`${routes.fetchLaravel}/api/upload`, {
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
            console.log(data);
        } catch (error) {
            setError(error);

        }
    }
    return (
        <div>
            {isLoggedIn ?
                <Container>
                    <Row className="d-flex justify-content-center align-items-center">
                        <Col md={4} lg={6} xs={12}>
                            <br></br>
                            <Card className="px-4 rounded bg-dark text-light">
                                <Card.Body>
                                    <div className="mb-3 mt-md-4">
                                        <h2 className="fw-bold mb-2 text-center text-uppercase">
                                            Instructions
                                        </h2>
                                        <div className="mb-3">
                                            Instructions to follow in order to upload your zip and image from your game so it can be played in the website
                                        </div>
                                        <div className="mb-3">
                                            1. Es necesario introducir un nombre para el juego que se va a cargar a la web.

                                        </div>

                                        <div className="mb-3">
                                            2. Se debe subir una imagen en formato <b>.png</b> para la miniatura del juego.
                                        </div>

                                        <div className="mb-3">
                                            3. Es <b>obligatorio</b> subir el juego hecho con <b>PHASER</b> en formatio <b>.zip</b>. <br></br>
                                            El juego tiene que contener un script denominado <b>initGames.js</b> el qual contenga la configuracion del PHASER.<br></br>
                                            <br></br><img src='initGame.PNG' width='450' height='450'></img>
                                        </div>

                                        <div className="mb-3">
                                            4. Se deberia añadir una descripcion adecuada a las caracteristicas del juego.
                                        </div>

                                        <div className="mb-3">
                                            5. Se podrá añadir categorias a los juegos.
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={8} lg={6} xs={12}>
                            <br></br>
                            <Card className="px-4 rounded bg-dark">
                                <Card.Body>
                                    <div className="mb-3 mt-md-4">
                                        <h2 className="fw-bold mb-2 text-center text-uppercase text-light ">
                                            Upload a Game
                                        </h2>
                                        <div className="mb-3">
                                            <Form>
                                                <Form.Group>
                                                    <Form.Label className='text-light'>Name Game</Form.Label>
                                                    <Form.Control id="nameGamee" type='text' placeholder="Name" value={nameGame} onChange={(e) => {setName(e.target.value)
                                                console.log("Input cambia", nameGame, "VAlue: ", e.target.value);    
                                                }
                                                } />
                                                </Form.Group>
                                                <br></br>

                                                <Form.Group>
                                                    <Form.Label className='text-light'>Image Game</Form.Label>
                                                    <Form.Control id='uploadImg' type='file' accept="image/png, image/jpeg" value={img} onChange={(e) => setImg(e.target.value)} />
                                                </Form.Group><br></br>

                                                <Form.Group>
                                                    <Form.Label className='text-light'>Zip Game</Form.Label>
                                                    <Form.Control id='uploadZip' type='file' accept='.zip' value={zip} onChange={(e) => setZip(e.target.value)} />
                                                </Form.Group><br></br>

                                                <Form.Group>
                                                    <Form.Label className='text-light'>Description</Form.Label>
                                                    <Form.Control id="descriptionGamee" placeholder="Add a description" rows='5' cols='50' value={description} onChange={(e) => setDescription(e.target.value)} />
                                                </Form.Group><br></br>

                                                <Form.Group>
                                                    <Form.Label className='text-light'>Categories</Form.Label>
                                                    {['checkbox'].map((type) => (
                                                        <div key={`inline-${type}`} className="mb-3 text-light">
                                                            <Form.Check
                                                                inline
                                                                label="Arcade"
                                                                name="group1"
                                                                type={type}
                                                                id={`inline-${type}-1`}
                                                            />
                                                            <Form.Check
                                                                inline
                                                                label="Action"
                                                                name="group1"
                                                                type={type}
                                                                id={`inline-${type}-2`}
                                                            />
                                                            <Form.Check
                                                                inline
                                                                label="Figthing"
                                                                name="group1"
                                                                type={type}
                                                                id={`inline-${type}-3`}
                                                            />
                                                        </div>
                                                    ))}
                                                </Form.Group><br></br>

                                                <Button variant="primary" onClick={UploadGame}>
                                                    Submit
                                                </Button>
                                            </Form>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                : <h2>
                    {t('mensajeErrorNotLoggedInUpload')}
                </h2>
            }
        </div>
    );

}
export default UploadForm;
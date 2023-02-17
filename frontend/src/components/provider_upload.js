import { useState } from 'react'
import { Card, Row, Col, Form, Button, Container, NavLink } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

const UploadForm = () => {
    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [zip, setZip] = useState('')
    const [description, setDescription] = useState('')
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

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
    function saveBlobs(blob, type){
        let blobZip;
        let blobImg;
        var fileImagen = document.getElementById("uploadImg").files[0];

        blobZip = blob;
        console.log("blobZip", blobZip);


        
        var imagen = new FileReader();

        imagen.onload = async function () {
            blobImg = dataURItoBlob(imagen.result);
            hacerFetch(blobZip, blobImg);

        };

        imagen.readAsDataURL(fileImagen);



        // if (type == "zip"){
        //     blobZip = blob; 
        //     console.log("blobZip", blobZip);
        //     console.log("blob", blob);
        // }
        // else {
        //     blobImg = blob; 
        //     console.log("blobImg", blobImg);
        //     console.log("blob", blob);
        // }

        // if (blobImg != null && blobZip != null){
        //     hacerFetch(blobZip, blobImg);
        //     console.log("VV");

        // }
        // else{
        //     console.log("F");
        // }
    }
    
    const onClick = async () => {
       

        var file = document.getElementById("uploadZip").files[0];
        var fileImagen = document.getElementById("uploadImg").files[0];
        var reader = new FileReader();
        // var imagen = new FileReader();

        reader.onload = function () {
            let blobresult = dataURItoBlob(reader.result)
            saveBlobs(blobresult, 'zip');
 
        };
        // imagen.onload = async function () {
        //     let blobresult = dataURItoBlob(imagen.result)
        //     await saveBlobs(blobresult, 'img');

        // };
        reader.readAsDataURL(file);
        // imagen.readAsDataURL(fileImagen);
        
    }
    async function hacerFetch(blobZip, blobImg) {
        try {
            console.log("Zip", blobZip);
            console.log("Img", blobImg);

            let fecha = new Date();
            let diaActual = fecha.getDate();
            let mesActual = fecha.getMonth();
            let añoActual = fecha.getFullYear()
            let minutos = fecha.getMinutes();
            let segundos = fecha.getSeconds();
            let milisegundos = fecha.getMilliseconds();

            let nombreArchivo = name + "_" + diaActual + "/" + mesActual + "/" + añoActual + "/" + minutos + "/" + segundos + "/" + milisegundos;
            console.log(nombreArchivo);

            console.log("frefer", blobZip);
            const formData = new FormData();
            formData.append('name', name);
            formData.append('img', blobImg, img);
            formData.append('zip', blobZip, nombreArchivo);
            formData.append('description', description);
            const response = await fetch('http://localhost:8000/api/upload', {
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
                                                <Form.Group controlId="formBasicNameGame">
                                                    <Form.Label className='text-light'>Name Game</Form.Label>
                                                    <Form.Control type='text' placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
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

                                                <Form.Group controlId="formBasicDescription">
                                                    <Form.Label className='text-light'>Description</Form.Label>
                                                    <Form.Control placeholder="Add a description" rows='5' cols='50' value={description} onChange={(e) => setDescription(e.target.value)} />
                                                </Form.Group><br></br>

                                                <Form.Group controlId="formBasicCategories">
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

                                                <Button variant="primary" onClick={onClick}>
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
                : <h2>You need to be logged in to upload games!</h2>
            }
        </div>


    )
}

export default UploadForm
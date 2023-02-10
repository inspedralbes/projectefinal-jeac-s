import { useState } from 'react'
import { Card, Row, Col, Form, Button, Container, NavLink } from 'react-bootstrap';

const UploadForm = () => {
    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [zip, setZip] = useState('')
    const [description, setDescription] = useState('')
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null);

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



    const onClick = async () => {
        var file = document.getElementById("uploadZip").files[0];
        var fileImagen = document.getElementById("uploadImg").files[0];
        var reader = new FileReader();
        var imagen = new FileReader();

        reader.onload = function () {
            let blobZip = dataURItoBlob(reader.result)
            let blobImg = dataURItoBlob(reader.result)

            hacerFetch(blobZip, blobImg);
        };
        imagen.onload = function () {
            let blobImg = dataURItoBlob(imagen.result)

            hacerFetch(blobImg);
        };
        reader.readAsDataURL(file);
        reader.readAsDataURL(fileImagen);

        async function hacerFetch(blobZip, blobImg) {
            try {
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

    }
    return (
        <div>
            <Container>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <br></br>
                        <Card className="px-4 rounded bg-secondary">
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

                                            <Form.Group controlId="formBasicImageGame">
                                                <Form.Label className='text-light'>Image Game</Form.Label>
                                                <Form.Control id='uploadImg' type='file' accept="image/png, image/jpeg" value={img} onChange={(e) => setImg(e.target.value)} />
                                            </Form.Group><br></br>

                                            <Form.Group controlId="formBasicZipGame">
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

                                            <Button variant="primary" type="submit" onClick={onClick}>
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
        </div>


    )
}

export default UploadForm
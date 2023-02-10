import { useState } from 'react'


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
        var blob = new Blob([ab], {type: mimeString});
        return blob;
      
      }



    const onClick = async () => {
        var file = document.getElementById("uploadZip").files[0];
        var fileImagen = document.getElementById("uploadImg").files[0];
        var reader = new FileReader();
        var imagen = new FileReader();

        reader.onload = function() {
        let blobZip = dataURItoBlob(reader.result)
        let blobImg = dataURItoBlob(reader.result)

        hacerFetch(blobZip, blobImg);
        };
        imagen.onload = function() {
            let blobImg = dataURItoBlob(imagen.result)
    
            hacerFetch(blobImg);
        };
        reader.readAsDataURL(file);
        reader.readAsDataURL(fileImagen);

        async function hacerFetch(blobZip, blobImg){
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
                        'Accept':'*/*'
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
        <form>  
            <div>
                <label>Name Game</label>
                <input type='text' placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>

            <div>
                <label>Image Game</label>
                <input id='uploadImg' type='file' accept="image/png, image/jpeg" value={img} onChange={(e) => setImg(e.target.value)}></input>
            </div>

            <div>
                <label>Zip Game</label>
                <input id='uploadZip' type='file' accept='.zip' value={zip} onChange={(e) => setZip(e.target.value)}></input>
            </div>

            <div>
                <label>Description</label>
                <textarea placeholder="Add a description" rows='5' cols='50' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div>
                <label>Categories</label>
                    <div>
                        <input type="checkbox" id="Arcade" name="categories" value="arcade" />
                        <label htmlFor="Arcade">Arcade</label>
                    </div>
                    <div>
                        <input type="checkbox" id="Multiplayer" name="categories" value="multiplayer" />
                        <label htmlFor="Multiplayer">Multiplayer</label>
                    </div>
                    <div>
                        <input type="checkbox" id="Platformer" name="categories" value="platformer" />
                        <label htmlFor="Platformer">Platformer</label>
                    </div>
            </div>



            <button onClick={onClick}>Upload Game</button>


        </form>

        
    )
}

export default UploadForm
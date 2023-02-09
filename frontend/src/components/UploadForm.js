import { useState } from 'react'


const UploadForm = () => {
    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [zip, setZip] = useState('')
    const [description, setDescription] = useState('')
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null);

    function dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        // create a view into the buffer
        var ia = new Uint8Array(ab);
        // set the bytes of the buffer to the correct values
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        // write the ArrayBuffer to a blob, and you're done
        var blob = new Blob([ab], {type: mimeString});
        return blob;
      
      }

    const onClick = async () => {
        var file = document.getElementById("uploadZip").files[0];
        var reader = new FileReader();
        reader.onload = function() {
        console.log(reader.result);
        let blobObj = dataURItoBlob(reader.result)
        console.log("AAA", blobObj)
        hacerFetch(blobObj);
        };
        reader.readAsDataURL(file);

        async function hacerFetch(blobObj){
            try {
                console.log("frefer", blobObj);
                const formData = new FormData();
                // FormData.append = {name, img, zip, description};
                formData.append('name', name);
                formData.append('img', img);
                formData.append('zip', blobObj, 'img.zip');
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
                <input type='file' accept="image/png, image/jpeg" value={img} onChange={(e) => setImg(e.target.value)}></input>
            </div>

            <div>
                <label>Zip Game</label>
                <input id='uploadZip' type='file'  value={zip} onChange={(e) => setZip(e.target.value)}></input>
            </div>

            <div>
                <label>Description</label>
                <textarea placeholder="Add a description" rows='5' cols='50' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div>
                <label>Categories</label>
                    <div>
                        <input type="checkbox" id="Arcade" name="categories" value="arcade" />
                        <label for="Arcade">Arcade</label>
                    </div>
                    <div>
                        <input type="checkbox" id="Multiplayer" name="categories" value="multiplayer" />
                        <label for="Multiplayer">Multiplayer</label>
                    </div>
                    <div>
                        <input type="checkbox" id="Platformer" name="categories" value="platformer" />
                        <label for="Platformer">Platformer</label>
                    </div>
            </div>



            <button onClick={onClick}>Upload Game</button>


        </form>

        
    )
}

export default UploadForm
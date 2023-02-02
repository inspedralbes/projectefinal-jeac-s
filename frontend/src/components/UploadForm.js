import { useState } from 'react'


const UploadForm = () => {
    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [zip, setZip] = useState('')
    const [description, setDescription] = useState('')
    const [categories, setCategories] = useState([])



const onClick = () => {
    if(!name | !img | !zip ) {
        alert('AAAAAAAAAAAAAAAAAAAAAAAA')
        return
    }


    console.log("Game uploaded correctly")
    console.log("Name: ", name, "Img: ", img, "Zip: ", zip, "Description: ", description)

    setName('')
    setImg('')
    setZip('')
    setDescription('')

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
                <input type='file' accept=".zip, .rar" value={zip} onChange={(e) => setZip(e.target.value)}></input>
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
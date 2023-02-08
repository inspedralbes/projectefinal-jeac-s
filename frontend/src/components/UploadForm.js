import { useState } from 'react'


const UploadForm = () => {
    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [zip, setZip] = useState('')
    const [description, setDescription] = useState('')
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null);

const onClick = async () => {

    // const response = await fetch(`http://localhost:8000/api/extract-zip`,{ 
    //     method: 'POST',
    //     headers:{
    //         'Content-Type': 'application/json',
    //         'Accept':'*/*'
    //     },
    //     body: JSON.stringify({ 
    //         zip:zip 
    //     }),
    //     // const data = await response.json();
    // })
    
    // .then(response => response.json()) 
    // .then(async data => {
    //     const result = await fetch(`http://localhost:8000/api/upload`,{ 
    //         method: 'POST',
    //         headers:{
    //             'Content-Type': 'application/json',
    //             'Accept':'*/*'
    //         },
    //         body: JSON.stringify({ 
    //             name, img, description 
    //         }),
    //     })
    // })
    // .then(result => result.json()) 






    // try {
    //     const formData = new FormData();
    //     formData.append('myFile', zip);

    //     const response = await fetch('http://localhost:8000/api/extract-zip', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Accept':'*/*'
    //       },
    //       //mode: 'no-cors',
    //         body: formData,
    //     });
  
    //     if (!response.ok) {
    //       throw new Error(response.statusText);
    //     }
  
    //     const data = await response.json();
    //     console.log(data);
    //   } catch (error) {
    //     setError(error);
  
    //   }

    try {
        const response = await fetch('http://localhost:8000/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept':'*/*'
          },
          //mode: 'no-cors',
         body: JSON.stringify({ name, img, description }),
        //  body: "{ 'name':'test123', 'description':'test123' }",
        });
  
        if (!response.ok) {
          throw new Error(response.statusText);
        }
  
        const data = await response.json();
        console.log(data);
      } catch (error) {
        setError(error);
  
      }


    // if(!name | !img | !zip ) {
    //     alert('Name img and zip ')
    //     return
    // }


    // console.log("Game uploaded correctly")
    // console.log("Name: ", name, "Img: ", img, "Zip: ", zip, "Description: ", description)

    // setName('')
    // setImg('')
    // setZip('')
    // setDescription('')

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

            {/* <div>
                <label>Zip Game</label>
                <input type='file' accept=".zip, .rar" value={zip} onChange={(e) => setZip(e.target.value)}></input>
            </div> */}

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
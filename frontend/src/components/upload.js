function Upload() {
    return (
        <div>
            <h1>Upload</h1>
            <form enctype="multipart/form-data" method="post" action="">
                <label>Choose a zip file to upload: <input type="file" name="zip_file" /></label>
                <br />
                <input type="submit" name="submit" value="Upload" />
            </form>
            
        </div>
    )
}

export default Upload;      
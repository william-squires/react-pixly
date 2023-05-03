import { useState } from "react"
import axios from "axios"
import Editor from "./Editor";

/** form for uploading images to backend
 *
 * Props
 * -none
 *
 * State
 * -formData: {file to upload}
 *
 * App ->UploadForm
 */
function UploadForm({getImage}) {
    const [formData, setFormData] = useState("")
    console.log(formData);

    /** Update local state w/curr state of input elem */
    function handleChange(evt) {
        const f = evt.target.files[0]
        setFormData(f);
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        // const fData = new FormData();
        // fData.append("file", formData);
        // await axios.post("http://localhost:5000/",
        //     fData,
        //     {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //             'Access-Control-Allow-Origin': '*',
        //         }
        //     });
        getImage(formData);
        setFormData("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                accept="image/*"
                value={formData.file}
                onChange={handleChange}>
            </input>
            <button>Upload!</button>
        </form>
    )
}

export default UploadForm;
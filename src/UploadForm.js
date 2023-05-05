import { useState } from "react"
import "./UploadForm.css";


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

    /** handle submit of form and reset form data */
    async function handleSubmit(evt) {
        evt.preventDefault();
        getImage(formData);
        setFormData("");
    }

    return (
        <form className="UploadForm" onSubmit={handleSubmit}>
            <input
                type="file"
                accept="image/*"
                value={formData.file}
                onChange={handleChange}>
            </input>
            <button className="UploadForm upload-btn">Upload!</button>
        </form>
    )
}

export default UploadForm;
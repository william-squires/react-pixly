import { useState } from "react";



/** Form for submitting files to backend */
function SubmitForm({ submit }) {
    const [formData, setFormData] = useState({ description: "" });

    /** Update form input. */
    function handleChange(evt) {
        const input = evt.target;
        setFormData(formData => ({
            ...formData,
            [input.name]: input.value,
        }));
    }

    /** Call parent function and clear form. */
    async function handleSubmit(evt) {
        evt.preventDefault();
        submit(formData);
        setFormData({ description: "" });
    }

    return (
        <div className="DownloadForm">
            <form onSubmit={handleSubmit}>
                <input
                    id="description"
                    name="description"
                    className="form-control"
                    placeholder="Enter a description"
                    onChange={handleChange}
                    value={formData.description}
                />
                <button>Submit Image</button>
            </form>
        </div>
    )
}

export default SubmitForm;
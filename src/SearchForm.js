import { useState } from "react";



/** Form for searching by description 
 * 
 * Props
 * -search()
 * 
 * State
 * -formData
 * 
 * SearchPage -> SearchForm
*/
function SearchForm({ search }) {
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
        search(formData);
        setFormData({ description: "" });
    }

    return (
        <div className="DownloadForm">
            <form onSubmit={handleSubmit}>
                <input
                    id="description"
                    name="description"
                    className="form-control"
                    placeholder="Search"
                    onChange={handleChange}
                    value={formData.description}
                />
                <button>Search</button>
            </form>
        </div>
    )
}

export default SearchForm;
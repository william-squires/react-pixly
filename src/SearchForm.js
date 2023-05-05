import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


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
    const [formData, setFormData] = useState({ searchTerm: "", searchMethod: "description" });
    console.log(formData)
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
        console.log(evt);
        evt.preventDefault();
        console.log("inside handleSubmit")
        search(formData);
        setFormData({ searchTerm: "", searchMethod: "description" });
    }

    return (
        <form className="d-flex" onSubmit={handleSubmit}>
                <input
                    name="searchTerm"
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={formData.searchTerm}
                    onChange={handleChange}
                />
                <select
                    name="searchMethod"
                    type="select"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={formData.searchMethod}
                    onChange={handleChange}>
                    <option value="description">Description</option>
                    <option value="make">Camera Make</option>
                    <option value="model">Camera Model</option>
                </select>
            <button variant="outline-success">Search</button>
        </form>
    )
}

export default SearchForm;
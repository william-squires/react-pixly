import { useState } from "react";
import "./SearchForm.css";


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
    const [formData, setFormData] = useState(
        {
            searchTerm: "",
            searchMethod: "description"
        });

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
        <form className="SearchForm" onSubmit={handleSubmit}>
                <input
                    className="search-input"
                    name="searchTerm"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={formData.searchTerm}
                    onChange={handleChange}
                />
                <select
                    className="searchForm-select"
                    name="searchMethod"
                    type="select"
                    placeholder="Search"
                    aria-label="Search"
                    value={formData.searchMethod}
                    onChange={handleChange}>
                    <option value="description">Description</option>
                    <option value="make">Camera Make</option>
                    <option value="model">Camera Model</option>
                </select>
            <button className="searchForm-btn">Search</button>
        </form>
    )
}

export default SearchForm;
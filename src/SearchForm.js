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
        <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Control
                    name="description"
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={formData.description}
                    onChange={handleChange}
                />
            <Button variant="outline-success">Search</Button>
        </Form>
    )
}

export default SearchForm;
import SearchForm from "./SearchForm"
import Image from "./Image"
import { useState } from "react"
import axios from "axios"

/** page for searching for images by description 
 * 
 * Props
 * -none
 * 
 * State
 * -images: [url, url, url...]
 * 
 * RoutesList -> SearchPage
*/
function SearchPage() {
    const [imageUrls, setImageUrls] = useState([])

    async function search(formData) {
        const resp = await axios.get(
            `http://localhost:5000/search?description=${formData.description}`,
            {headers: {'Access-Control-Allow-Origin': '*' }});
        console.log(resp.data);
        setImageUrls(resp.data);
    }


    return (
        <div>
            <SearchForm search={search}/>
            {imageUrls.map((url, idx) => {
                return <Image key={idx} imgUrl={url.url}/>
            } )}
        </div>
    )
}

export default SearchPage;
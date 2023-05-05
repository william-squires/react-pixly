import SearchForm from "./SearchForm";
import Image from "./Image";
import { searchImages } from "./ApiCalls";
import { useState } from "react";

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
    const [imageUrls, setImageUrls] = useState([]);

    async function search(formData) {
        const resp = await searchImages(
            formData.searchMethod,
            formData.searchTerm
        );
        setImageUrls(resp);
    }

    return (
        <div>
            <SearchForm search={search} />
            {imageUrls.map((url, idx) => {
                return <Image key={idx} imgUrl={url.url} />;
            })}
        </div>

    );
}

export default SearchPage;
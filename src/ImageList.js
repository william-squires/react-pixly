import axios from "axios";
import { useEffect, useState } from "react";

/** renders list of all images 
 * 
 * Props
 * -none
 * 
 * State
 * -imageIds
 * 
 * App -> ImageList
*/
function ImageList() {
    const [imageIds, setImageIds] = useState([])
    console.log(imageIds);

    useEffect(function getImagesOnMount() {
        async function getImages() {
            const resp = await axios.get('http://localhost:5000/')
            setImageIds(resp.data)
        }

        getImages()
    }, [])

    return(
        <div>
            {imageIds && 
            imageIds.map((img, idx) => {
                return <img key={idx} width={500} height={500} src={`${img.url}`} alt={`img-${idx}`} />
            })}
        </div>
    )
}

export default ImageList;
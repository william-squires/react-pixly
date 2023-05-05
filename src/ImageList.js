import axios from "axios";
import { useEffect, useState } from "react";
import Image from "./Image";
import { getImagesForList } from "./ApiCalls";
/** renders list of all images
 *
 * Props
 * -none
 *
 * State
 * -imageIds
 *
 * App -> ImageList --> Image
*/
function ImageList() {
    const [imageIds, setImageIds] = useState([]);
    console.log(imageIds);

    useEffect(function getImagesOnMount() {
        async function getImages() {
            const imagesForList = await getImagesForList();
            setImageIds(imagesForList);
        }
        getImages();
    }, []);

    return (
        <div className="ImageList">
            {imageIds &&
                imageIds.map((img, idx) => {
                    return <Image key={idx} imgUrl={img.url} />;
                })}
        </div>
    );
}

export default ImageList;
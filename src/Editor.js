import UploadForm from "./UploadForm";
import { useState } from "react";
import Image from "./Image";
import axios from "axios";

/** Editor : edit a single image
 *
 * Props: imgUrl
 *
 * State: Image to be edited, fileDataUrl
 *
 * Upload image to s3.
 * Show editing tools and image here.
 * Submit button after editing to reupload to s3.
 *
 * { RoutesList, ImageList } --> Editor
 */

function Editor ({ imgUrl }) {
  const [workingImage, setWorkingImage] = useState('');
  console.log("workingImg=", workingImage);
  const [fileDataUrl, setFileDataUrl] = useState(null);

  /** Get image from upload and save it in state */
  function getImage(formData){
    console.log("formData in editor fn=", formData);
    setWorkingImage(formData);
    setFileDataUrl(URL.createObjectURL(formData));
  }

  async function uploadImageToBucket(evt){
    evt.preventDefault();
    const fData = new FormData();
    fData.append("file", workingImage);
    await axios.post("http://localhost:5000/",
        fData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        });
  }

  return (
  <div className="Editor">
    <UploadForm getImage={getImage}/>
    <div className="Editor imageContainer">
      {workingImage && <Image imgUrl={fileDataUrl} />}
    </div>
    <div className="Editor editingTools">

    </div>

    <div className="Editor imageSubmit">
      <button onClick={uploadImageToBucket}>Submit Edited Image</button>
    </div>
  </div>)
}

export default Editor;
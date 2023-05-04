import UploadForm from "./UploadForm";
import { useState } from "react";
import Image from "./Image";
import axios from "axios";
import "./Editor.css";
require("jimp/browser/lib/jimp.js");
const { Jimp } = window;


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
  const [jimpImage, setJimpImage] = useState(null);
  console.log("jimpImg=", jimpImage);
  const [imgBase64, setImgBase64] = useState(null)
  const [editedImage, setEditedImage] = useState(null)

  /** Get image from upload and save it in state */
  async function getImage(formData){
    console.log("formData in editor fn=", formData);
    const url = URL.createObjectURL(formData)
    const img = await Jimp.read(url)
    setJimpImage(img)
    setImgBase64(await img.getBase64Async(Jimp.AUTO))
    setEditedImage(img)
  }

  async function uploadImageToBucket(evt){
    evt.preventDefault();
    const fData = new FormData();
    fData.append("file", imgBase64);
    await axios.post("http://localhost:5000/",
        fData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        });
  }

  async function makeGreyscale() {
    const f = editedImage.clone()
    f.greyscale();
    setEditedImage(f)
    setImgBase64(await f.getBase64Async(Jimp.AUTO))
  }

  async function makeSepia() {
    const f = editedImage.clone()
    f.sepia();
    setEditedImage(f)
    setImgBase64(await f.getBase64Async(Jimp.AUTO))
  }

  async function blur() {
    const f = editedImage.clone()
    f.blur(2);
    setEditedImage(f)
    setImgBase64(await f.getBase64Async(Jimp.AUTO))
  }

  async function reset() {
    setEditedImage(jimpImage)
    setImgBase64(await jimpImage.getBase64Async(Jimp.AUTO))
  }

  return (
  <div className="Editor">
    <UploadForm getImage={getImage}/>
    <div className="Editor imageContainer">
      {imgBase64 && <Image imgUrl={imgBase64} />}
    </div>
    <div className="Editor editingTools">
      <button onClick={makeGreyscale}>Greyscale</button>
    </div>
    <div className="Editor editingTools">
      <button onClick={makeSepia}>Sepia</button>
    </div>
    <div className="Editor editingTools">
      <button onClick={blur}>Blur</button>
    </div>

    <div className="Editor editingTools">
      <button onClick={reset}>Reset</button>
    </div>

    <div className="Editor imageSubmit">
      <button className="Editor submit-btn" onClick={uploadImageToBucket}>
        Submit Image
      </button>
    </div>
  </div>
  )
}

export default Editor;